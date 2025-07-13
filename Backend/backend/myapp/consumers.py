import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Property, Bus, Train, Homestay
from .serializers import PropertySerializer, BusSerializer, TrainSerializer, HomestaySerializer

class RealTimeDataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("real_time_updates", self.channel_name)

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("real_time_updates", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message_type = data.get('type')
        
        if message_type == 'subscribe_properties':
            await self.subscribe_to_properties(data)
        elif message_type == 'subscribe_buses':
            await self.subscribe_to_buses(data)
        elif message_type == 'subscribe_trains':
            await self.subscribe_to_trains(data)
        elif message_type == 'subscribe_homestays':
            await self.subscribe_to_homestays(data)

    async def subscribe_to_properties(self, data):
        filters = data.get('filters', {})
        properties = await self.get_properties(filters)
        await self.send(text_data=json.dumps({
            'type': 'properties_update',
            'data': properties
        }))

    async def subscribe_to_buses(self, data):
        filters = data.get('filters', {})
        buses = await self.get_buses(filters)
        await self.send(text_data=json.dumps({
            'type': 'buses_update',
            'data': buses
        }))

    async def subscribe_to_trains(self, data):
        filters = data.get('filters', {})
        trains = await self.get_trains(filters)
        await self.send(text_data=json.dumps({
            'type': 'trains_update',
            'data': trains
        }))

    async def subscribe_to_homestays(self, data):
        filters = data.get('filters', {})
        homestays = await self.get_homestays(filters)
        await self.send(text_data=json.dumps({
            'type': 'homestays_update',
            'data': homestays
        }))

    @database_sync_to_async
    def get_properties(self, filters):
        queryset = Property.objects.filter(is_active=True)
        
        if filters.get('city'):
            queryset = queryset.filter(city__icontains=filters['city'])
        if filters.get('state'):
            queryset = queryset.filter(state__icontains=filters['state'])
        if filters.get('type'):
            queryset = queryset.filter(type=filters['type'])
        if filters.get('min_price'):
            queryset = queryset.filter(price_per_night__gte=filters['min_price'])
        if filters.get('max_price'):
            queryset = queryset.filter(price_per_night__lte=filters['max_price'])
        
        serializer = PropertySerializer(queryset[:50], many=True)
        return serializer.data

    @database_sync_to_async
    def get_buses(self, filters):
        queryset = Bus.objects.all()
        
        if filters.get('from_city'):
            queryset = queryset.filter(from_city__icontains=filters['from_city'])
        if filters.get('to_city'):
            queryset = queryset.filter(to_city__icontains=filters['to_city'])
        if filters.get('seat_type'):
            queryset = queryset.filter(seat_type=filters['seat_type'])
        
        serializer = BusSerializer(queryset[:50], many=True)
        return serializer.data

    @database_sync_to_async
    def get_trains(self, filters):
        queryset = Train.objects.all()
        
        if filters.get('from_station'):
            queryset = queryset.filter(from_station__icontains=filters['from_station'])
        if filters.get('to_station'):
            queryset = queryset.filter(to_station__icontains=filters['to_station'])
        
        serializer = TrainSerializer(queryset[:50], many=True)
        return serializer.data

    @database_sync_to_async
    def get_homestays(self, filters):
        queryset = Homestay.objects.filter(is_active=True)
        
        if filters.get('city'):
            queryset = queryset.filter(city__icontains=filters['city'])
        if filters.get('country'):
            queryset = queryset.filter(country__icontains=filters['country'])
        if filters.get('min_price'):
            queryset = queryset.filter(price_per_night__gte=filters['min_price'])
        if filters.get('max_price'):
            queryset = queryset.filter(price_per_night__lte=filters['max_price'])
        
        serializer = HomestaySerializer(queryset[:50], many=True)
        return serializer.data

    async def data_update(self, event):
        """Send data updates to WebSocket"""
        await self.send(text_data=json.dumps({
            'type': event['data_type'],
            'data': event['data']
        })) 