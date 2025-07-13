import requests
import json
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, OAuthProfile
from .serializers import UserSerializer

# OAuth Configuration
OAUTH_CONFIG = {
    'google': {
        'token_url': 'https://oauth2.googleapis.com/token',
        'userinfo_url': 'https://www.googleapis.com/oauth2/v2/userinfo',
        'client_id': getattr(settings, 'GOOGLE_CLIENT_ID', ''),
        'client_secret': getattr(settings, 'GOOGLE_CLIENT_SECRET', ''),
    },
    'facebook': {
        'token_url': 'https://graph.facebook.com/v12.0/oauth/access_token',
        'userinfo_url': 'https://graph.facebook.com/me',
        'client_id': getattr(settings, 'FACEBOOK_CLIENT_ID', ''),
        'client_secret': getattr(settings, 'FACEBOOK_CLIENT_SECRET', ''),
    },
    'github': {
        'token_url': 'https://github.com/login/oauth/access_token',
        'userinfo_url': 'https://api.github.com/user',
        'client_id': getattr(settings, 'GITHUB_CLIENT_ID', ''),
        'client_secret': getattr(settings, 'GITHUB_CLIENT_SECRET', ''),
    }
}

def get_or_create_user_from_oauth(provider, user_data):
    """Get or create user from OAuth data"""
    try:
        # Try to find existing OAuth profile
        oauth_profile = OAuthProfile.objects.get(
            provider=provider,
            provider_user_id=user_data['id']
        )
        return oauth_profile.user, False  # False = existing user
    except OAuthProfile.DoesNotExist:
        # Create new user and OAuth profile
        email = user_data.get('email')
        name = user_data.get('name', '')
        
        # Check if user with this email already exists
        if email:
            try:
                user = User.objects.get(email=email)
                # User exists but no OAuth profile, create one
                oauth_profile = OAuthProfile.objects.create(
                    user=user,
                    provider=provider,
                    provider_user_id=user_data['id'],
                    profile_picture=user_data.get('picture', '')
                )
                return user, False
            except User.DoesNotExist:
                pass
        
        # Create new user
        user = User.objects.create(
            email=email,
            name=name,
            preference='traveller',  # Default preference
            is_verified=True  # OAuth users are considered verified
        )
        
        # Create OAuth profile
        oauth_profile = OAuthProfile.objects.create(
            user=user,
            provider=provider,
            provider_user_id=user_data['id'],
            profile_picture=user_data.get('picture', '')
        )
        
        return user, True  # True = new user

def exchange_code_for_token(provider, code, redirect_uri):
    """Exchange authorization code for access token"""
    config = OAUTH_CONFIG.get(provider)
    if not config:
        raise ValueError(f"Unsupported provider: {provider}")
    
    token_data = {
        'client_id': config['client_id'],
        'client_secret': config['client_secret'],
        'code': code,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }
    
    headers = {'Accept': 'application/json'}
    
    response = requests.post(config['token_url'], data=token_data, headers=headers)
    response.raise_for_status()
    
    token_response = response.json()
    
    if 'error' in token_response:
        raise ValueError(f"Token exchange failed: {token_response['error']}")
    
    return token_response.get('access_token')

def get_user_info(provider, access_token):
    """Get user information from OAuth provider"""
    config = OAUTH_CONFIG.get(provider)
    if not config:
        raise ValueError(f"Unsupported provider: {provider}")
    
    headers = {'Authorization': f'Bearer {access_token}'}
    
    if provider == 'github':
        headers['Accept'] = 'application/vnd.github.v3+json'
    
    response = requests.get(config['userinfo_url'], headers=headers)
    response.raise_for_status()
    
    user_data = response.json()
    
    # Normalize user data across providers
    normalized_data = {
        'id': str(user_data.get('id')),
        'email': user_data.get('email'),
        'name': user_data.get('name', ''),
        'picture': user_data.get('picture') or user_data.get('avatar_url', '')
    }
    
    return normalized_data

@api_view(['POST'])
@permission_classes([AllowAny])
def google_oauth(request):
    """Handle Google OAuth with ID token"""
    try:
        credential = request.data.get('credential')
        if not credential:
            return Response({'error': 'Credential is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Verify Google ID token (you should implement proper verification)
        # For now, we'll decode it to get user info
        import base64
        import jwt
        
        try:
            # Decode the ID token (without verification for demo)
            decoded = jwt.decode(credential, options={"verify_signature": False})
            
            user_data = {
                'id': decoded.get('sub'),
                'email': decoded.get('email'),
                'name': decoded.get('name', ''),
                'picture': decoded.get('picture', '')
            }
            
            user, is_new = get_or_create_user_from_oauth('google', user_data)
            
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'user': UserSerializer(user).data,
                'token': str(refresh.access_token),
                'refresh': str(refresh),
                'is_new_user': is_new
            })
            
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid credential'}, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def facebook_oauth(request):
    """Handle Facebook OAuth"""
    try:
        access_token = request.data.get('access_token')
        if not access_token:
            return Response({'error': 'Access token is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get user info from Facebook
        user_data = get_user_info('facebook', access_token)
        
        user, is_new = get_or_create_user_from_oauth('facebook', user_data)
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'token': str(refresh.access_token),
            'refresh': str(refresh),
            'is_new_user': is_new
        })
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def oauth_callback(request):
    """Handle OAuth callback for providers that use authorization code flow"""
    try:
        code = request.data.get('code')
        provider = request.data.get('provider')
        redirect_uri = request.data.get('redirect_uri')
        
        if not all([code, provider, redirect_uri]):
            return Response({
                'error': 'Code, provider, and redirect_uri are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if provider not in OAUTH_CONFIG:
            return Response({
                'error': f'Unsupported provider: {provider}'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Exchange code for access token
        access_token = exchange_code_for_token(provider, code, redirect_uri)
        
        # Get user info
        user_data = get_user_info(provider, access_token)
        
        # Get or create user
        user, is_new = get_or_create_user_from_oauth(provider, user_data)
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'token': str(refresh.access_token),
            'refresh': str(refresh),
            'is_new_user': is_new
        })
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def traditional_login(request):
    """Traditional email/password login"""
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({
                'error': 'Email and password are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Find user by email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        # For now, we'll use a simple password check
        # In production, you should use proper password hashing
        if not hasattr(user, 'password') or user.password != password:
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'token': str(refresh.access_token),
            'refresh': str(refresh)
        })
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def traditional_register(request):
    """Traditional email/password registration"""
    try:
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')
        phone = request.data.get('phone', '')
        newsletter = request.data.get('newsletter', False)
        
        if not all([name, email, password]):
            return Response({
                'error': 'Name, email, and password are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user already exists
        if User.objects.filter(email=email).exists():
            return Response({
                'error': 'User with this email already exists'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create new user
        user = User.objects.create(
            name=name,
            email=email,
            phone=phone,
            preference='traveller',
            is_verified=False  # Traditional users need email verification
        )
        
        # In production, you should hash the password
        # For now, we'll store it as is (NOT recommended for production)
        user.password = password
        user.save()
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'token': str(refresh.access_token),
            'refresh': str(refresh),
            'is_new_user': True
        })
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 