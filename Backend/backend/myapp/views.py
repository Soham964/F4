from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Property, PropertyAvailability, PropertyReview, Bus, Train, Homestay, BusOperator
from .serializers import *


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['city', 'state', 'type', 'max_guests', 'instant_book']
    search_fields = ['name', 'location', 'description']
    ordering_fields = ['price_per_night', 'rating', 'created_at']

    def get_queryset(self):
        queryset = Property.objects.filter(is_active=True)
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        min_rating = self.request.query_params.get('min_rating', None)

        if min_price:
            queryset = queryset.filter(price_per_night__gte=min_price)
        if max_price:
            queryset = queryset.filter(price_per_night__lte=max_price)
        if min_rating:
            queryset = queryset.filter(rating__gte=min_rating)

        return queryset

    @action(detail=True, methods=['get'])
    def availability(self, request, pk=None):
        property = self.get_object()
        availabilities = PropertyAvailability.objects.filter(property=property)
        serializer = PropertyAvailabilitySerializer(availabilities, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def reviews(self, request, pk=None):
        property = self.get_object()
        reviews = PropertyReview.objects.filter(property=property)
        serializer = PropertyReviewSerializer(reviews, many=True)
        return Response(serializer.data)

class BusViewSet(viewsets.ModelViewSet):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['from_city', 'to_city', 'seat_type', 'operator']
    search_fields = ['bus_number', 'bus_type']
    ordering_fields = ['departure_time', 'base_fare', 'rating']

    def get_queryset(self):
        queryset = Bus.objects.all()
        from_city = self.request.query_params.get('from_city', None)
        to_city = self.request.query_params.get('to_city', None)
        date = self.request.query_params.get('date', None)

        if from_city:
            queryset = queryset.filter(from_city__icontains=from_city)
        if to_city:
            queryset = queryset.filter(to_city__icontains=to_city)
        if date:
            queryset = queryset.filter(departure_time__date=date)

        return queryset

class TrainViewSet(viewsets.ModelViewSet):
    queryset = Train.objects.all()
    serializer_class = TrainSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['from_station', 'to_station', 'classes_available']
    search_fields = ['number', 'name']
    ordering_fields = ['departure_time', 'base_fare']

    def get_queryset(self):
        queryset = Train.objects.all()
        from_station = self.request.query_params.get('from_station', None)
        to_station = self.request.query_params.get('to_station', None)
        date = self.request.query_params.get('date', None)

        if from_station:
            queryset = queryset.filter(from_station__icontains=from_station)
        if to_station:
            queryset = queryset.filter(to_station__icontains=to_station)

        return queryset

class HomestayViewSet(viewsets.ModelViewSet):
    queryset = Homestay.objects.filter(is_active=True)
    serializer_class = HomestaySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['city', 'country', 'host']
    search_fields = ['name', 'description', 'address']
    ordering_fields = ['price_per_night', 'rating', 'created_at']

    def get_queryset(self):
        queryset = Homestay.objects.filter(is_active=True)
        city = self.request.query_params.get('city', None)
        country = self.request.query_params.get('country', None)
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)

        if city:
            queryset = queryset.filter(city__icontains=city)
        if country:
            queryset = queryset.filter(country__icontains=country)
        if min_price:
            queryset = queryset.filter(price_per_night__gte=min_price)
        if max_price:
            queryset = queryset.filter(price_per_night__lte=max_price)

        return queryset

class BusOperatorViewSet(viewsets.ModelViewSet):
    queryset = BusOperator.objects.all()
    serializer_class = BusOperatorSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['rating', 'total_buses']