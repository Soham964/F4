from rest_framework import serializers
from .models import *

class PropertySerializer(serializers.ModelSerializer):
    rating_count = serializers.IntegerField(source='reviews.count', read_only=True)
    host_name = serializers.CharField(source='host.username', read_only=True)
    
    class Meta:
        model = Property
        fields = [
            'id', 'name', 'type', 'location', 'state', 'city',
            'description', 'max_guests', 'bedrooms', 'bathrooms',
            'price_per_night', 'rating', 'total_ratings', 'rating_count',
            'instant_book', 'verified_host', 'amenities', 'photos',
            'photo_count', 'host_name'
        ]

class PropertyAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyAvailability
        fields = ['date', 'is_available', 'base_price', 'minimum_stay']

class PropertyReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = PropertyReview
        fields = [
            'id', 'rating', 'comment', 'cleanliness_rating',
            'location_rating', 'value_rating', 'amenities_rating',
            'photos', 'created_at', 'user_name'
        ]

class BusSerializer(serializers.ModelSerializer):
    operator_name = serializers.CharField(source='operator.name', read_only=True)
    
    class Meta:
        model = Bus
        fields = [
            'id', 'bus_number', 'bus_type', 'from_city', 'to_city',
            'departure_time', 'arrival_time', 'duration', 'seat_type',
            'total_seats', 'available_seats', 'window_seats', 'base_fare',
            'rating', 'total_ratings', 'live_tracking', 'amenities',
            'operator_name'
        ]

class TrainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Train
        fields = [
            'id', 'number', 'name', 'from_station', 'to_station',
            'departure_time', 'arrival_time', 'duration', 'distance',
            'running_days', 'classes_available', 'base_fare'
        ]

class HomestaySerializer(serializers.ModelSerializer):
    host_name = serializers.CharField(source='host.username', read_only=True)
    
    class Meta:
        model = Homestay
        fields = [
            'id', 'name', 'description', 'address', 'city', 'country',
            'price_per_night', 'total_rooms', 'available_rooms',
            'amenities', 'house_rules', 'photos', 'rating', 'host_name'
        ]

class BusOperatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusOperator
        fields = ['id', 'name', 'logo', 'description', 'rating', 'total_buses']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'name', 'email', 'phone', 'preference', 
            'preferred_language', 'is_verified', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

class OAuthProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = OAuthProfile
        fields = [
            'id', 'provider', 'provider_user_id', 'profile_picture',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']