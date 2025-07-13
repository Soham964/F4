# OAuth Authentication Setup Guide

This guide will help you set up OAuth authentication for Google, Facebook, and GitHub in your VillageStay project.

## Prerequisites

- Python 3.8+
- Node.js 14+
- Django 4.0+
- Next.js 13+

## Frontend Setup

### 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here
NEXT_PUBLIC_FACEBOOK_CLIENT_ID=your-facebook-client-id-here
NEXT_PUBLIC_GITHUB_CLIENT_ID=your-github-client-id-here

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws/realtime/

# Groq API (for AI Chat)
NEXT_PUBLIC_GROQ_API_KEY=your-groq-api-key-here
```

### 2. OAuth Provider Setup

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000`
7. Copy the Client ID and add it to your `.env.local`

#### Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or select an existing one
3. Add Facebook Login product
4. Go to "Facebook Login" → "Settings"
5. Add Valid OAuth Redirect URIs:
   - `http://localhost:3000/auth/callback`
6. Copy the App ID and add it to your `.env.local`

#### GitHub OAuth

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - Application name: VillageStay
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/auth/callback`
4. Copy the Client ID and add it to your `.env.local`

## Backend Setup

### 1. Install Required Packages

```bash
cd Backend/backend
pip install djangorestframework-simplejwt requests PyJWT
```

### 2. Django Settings

Add the following to your `settings.py`:

```python
# OAuth Configuration
GOOGLE_CLIENT_ID = 'your-google-client-id'
GOOGLE_CLIENT_SECRET = 'your-google-client-secret'

FACEBOOK_CLIENT_ID = 'your-facebook-client-id'
FACEBOOK_CLIENT_SECRET = 'your-facebook-client-secret'

GITHUB_CLIENT_ID = 'your-github-client-id'
GITHUB_CLIENT_SECRET = 'your-github-client-secret'

# JWT Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}

from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',
}
```

### 3. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Install Additional Dependencies

```bash
pip install requests PyJWT
```

## Usage

### Frontend Components

The OAuth buttons are already integrated into your login and signup pages. They will automatically:

1. Initialize OAuth providers
2. Handle authentication flow
3. Store tokens in localStorage
4. Redirect users after successful authentication

### API Endpoints

The following endpoints are available:

- `POST /api/auth/google/` - Google OAuth
- `POST /api/auth/facebook/` - Facebook OAuth  
- `POST /api/auth/oauth/callback/` - OAuth callback (for GitHub)
- `POST /api/auth/login/` - Traditional email/password login
- `POST /api/auth/register/` - Traditional email/password registration

### Authentication Flow

1. **Google OAuth**: Uses Google Identity Services for one-click sign-in
2. **Facebook OAuth**: Uses Facebook SDK for authentication
3. **GitHub OAuth**: Uses authorization code flow with redirect

### Token Management

- Access tokens are automatically included in API requests
- Tokens are stored in localStorage
- Automatic token refresh is handled by the frontend
- 401 responses trigger automatic logout

## Security Considerations

### Production Setup

1. **HTTPS**: Always use HTTPS in production
2. **Environment Variables**: Never commit OAuth secrets to version control
3. **Token Verification**: Implement proper JWT token verification
4. **CSRF Protection**: Enable CSRF protection for traditional forms
5. **Rate Limiting**: Implement rate limiting on authentication endpoints

### OAuth Security

1. **State Parameter**: Always use state parameter for CSRF protection
2. **Token Storage**: Store tokens securely (consider httpOnly cookies)
3. **Token Expiration**: Implement proper token expiration handling
4. **User Verification**: Verify OAuth tokens on the backend

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your Django CORS settings include your frontend domain
2. **Redirect URI Mismatch**: Double-check redirect URIs in OAuth provider settings
3. **Invalid Client ID**: Verify client IDs are correctly set in environment variables
4. **Token Expiration**: Implement proper token refresh logic

### Debug Mode

Enable debug logging by adding to your Django settings:

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'myapp.oauth_views': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    },
}
```

## Testing

### Test OAuth Flow

1. Start your Django backend: `python manage.py runserver`
2. Start your Next.js frontend: `npm run dev`
3. Navigate to `/login` or `/signup`
4. Click on OAuth buttons to test authentication
5. Check browser console for any errors
6. Verify tokens are stored in localStorage

### Test API Endpoints

Use tools like Postman or curl to test the authentication endpoints:

```bash
# Test Google OAuth
curl -X POST http://localhost:8000/api/auth/google/ \
  -H "Content-Type: application/json" \
  -d '{"credential": "your-google-id-token"}'

# Test traditional login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

## Support

If you encounter issues:

1. Check the browser console for frontend errors
2. Check Django logs for backend errors
3. Verify OAuth provider settings
4. Ensure all environment variables are set correctly
5. Test with a fresh browser session

## Next Steps

After setting up OAuth:

1. Implement email verification for traditional users
2. Add password reset functionality
3. Implement user profile management
4. Add role-based access control
5. Implement session management
6. Add audit logging for authentication events 