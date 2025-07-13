from django.db import models
from django.conf import settings
from typing import cast

class Homestay(models.Model):
    host = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='hosted_homestays')
    name = models.CharField(max_length=200)
    description = models.TextField()
    address = models.TextField()
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    total_rooms = models.IntegerField()
    available_rooms = models.IntegerField()
    amenities = models.JSONField(default=list)
    house_rules = models.JSONField(default=list)
    photos = models.JSONField(default=list)  # Store photo URLs
    rating = models.FloatField(default=0.0) # pyright: ignore[reportArgumentType]
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True) # pyright: ignore[reportArgumentType]

    def _str_(self):
        return f"{self.name} - {self.city}"

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed')
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    homestay = models.ForeignKey(Homestay, on_delete=models.CASCADE, related_name='bookings')
    check_in = models.DateField()
    check_out = models.DateField()
    guests = models.IntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    special_requests = models.TextField(blank=True, null=True)

    def _str_(self):
        return f"{self.user.username} - {self.homestay.name} ({self.check_in} to {self.check_out})"

class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
    homestay = models.ForeignKey(Homestay, on_delete=models.CASCADE, related_name='reviews')
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='review')
    rating = models.IntegerField()
    comment = models.TextField()
    cleanliness_rating = models.IntegerField()
    communication_rating = models.IntegerField()
    value_rating = models.IntegerField()
    location_rating = models.IntegerField()
    photos = models.JSONField(default=list)  # Store photo URLs
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def _str_(self):
        return f"{self.user.username}'s review of {self.homestay.name}"

class Payment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded')
    ]

    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    payment_method = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    transaction_id = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def _str_(self):
        return f"Payment for booking {self.booking.id} - {self.status}"

class Transaction(models.Model):
    TYPE_CHOICES = [
        ('payment', 'Payment'),
        ('refund', 'Refund'),
        ('payout', 'Payout')
    ]

    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name='transactions')
    transaction_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    provider_transaction_id = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(default=dict)  # Store additional transaction details

    def _str_(self):
        return f"{self.transaction_type} - {self.amount} {self.currency}"

class TranslationsCache(models.Model):
    source_text = models.TextField()
    source_language = models.CharField(max_length=10)
    target_language = models.CharField(max_length=10)
    translated_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_used = models.DateTimeField(auto_now=True)
    use_count = models.IntegerField(default=1)

    class Meta:
        unique_together = ('source_text', 'source_language', 'target_language')

    def _str_(self):
        return f"Translation from {self.source_language} to {self.target_language}"

class SupportRequest(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed')
    ]

    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent')
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='support_requests')
    booking = models.ForeignKey(Booking, on_delete=models.SET_NULL, null=True, blank=True, related_name='support_requests')
    subject = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    attachments = models.JSONField(default=list)  # Store attachment URLs

    def _str_(self):
        return f"Support Request #{self.id} - {self.subject}"

class AILog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='ai_interactions')
    session_id = models.CharField(max_length=100)
    query = models.TextField()
    response = models.TextField()
    context = models.JSONField(default=dict)  # Store conversation context
    created_at = models.DateTimeField(auto_now_add=True)
    feedback = models.IntegerField(null=True, blank=True)  # User feedback score
    processing_time = models.FloatField()  # Time taken to process the request

class User(models.Model):
    PREFERENCE_CHOICES = [
        ('traveller', 'Traveller'),
        ('provider', 'Service Provider'),
    ]

    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('hi', 'Hindi'),
        ('mr', 'Marathi'),
        ('kn', 'Kannada'),
        ('bn', 'Bengali'),
        # Add more as needed
    ]

    phone = models.CharField(max_length=15, unique=False, null=True, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    name = models.CharField(max_length=100, blank=True, null=True)

    preference = models.CharField(max_length=20, choices=PREFERENCE_CHOICES)
    preferred_language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES, default='en')

    is_verified = models.BooleanField(default=False) # pyright: ignore[reportArgumentType]
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.phone or self.email or "Unnamed User"
    
class Train(models.Model):
    TRAIN_CLASSES = [
        ('ALL', 'All Classes'),
        ('SL', 'Sleeper (SL)'),
        ('3A', 'AC 3 Tier (3A)'),
        ('2A', 'AC 2 Tier (2A)'),
        ('1A', 'AC First Class (1A)'),
        ('CC', 'Chair Car (CC)'),
    ]

    number = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    from_station = models.CharField(max_length=100)
    to_station = models.CharField(max_length=100)
    departure_time = models.TimeField()
    arrival_time = models.TimeField()
    duration = models.CharField(max_length=20)  # Store as "HH:mm" format
    distance = models.IntegerField(help_text="Distance in kilometers")
    running_days = models.CharField(max_length=100)  # Store as "Mon,Tue,Wed" etc
    classes_available = models.CharField(
        max_length=20,
        choices=TRAIN_CLASSES,
        default='ALL'
    )
    base_fare = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['departure_time']
        indexes = [
            models.Index(fields=['from_station', 'to_station']),
            models.Index(fields=['departure_time']),
        ]

    def __str__(self):
        return f"{self.number} - {self.name}"

class TrainClass(models.Model):
    train = models.ForeignKey(Train, related_name='class_details', on_delete=models.CASCADE)
    class_type = models.CharField(max_length=3, choices=Train.TRAIN_CLASSES)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    available_seats = models.IntegerField()
    total_seats = models.IntegerField()
    has_tatkal = models.BooleanField(default=True) # pyright: ignore[reportArgumentType]
    tatkal_charge = models.DecimalField(max_digits=6, decimal_places=2)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['train', 'class_type']
        verbose_name_plural = 'Train Classes'

    def __str__(self):
        return f"{cast(Train, self.train).number} - {self.class_type}"
    

class BusOperator(models.Model):
    name = models.CharField(max_length=200)  # e.g. "UPSRTC", "Laxmi holidays"
    logo = models.URLField(blank=True)
    description = models.TextField()  # e.g. "Uttar Pradesh State Road Transport Corporation"
    rating = models.FloatField(default=0.0) # pyright: ignore[reportArgumentType]
    total_buses = models.IntegerField(default=0) # pyright: ignore[reportArgumentType]
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Bus(models.Model):
    SEAT_TYPE_CHOICES = [
        ('seater', 'Seater'),
        ('sleeper', 'Sleeper'),
        ('ac_seater', 'AC Seater'),
        ('ac_sleeper', 'AC Sleeper'),
    ]

    operator = models.ForeignKey(BusOperator, on_delete=models.CASCADE, related_name='buses')
    bus_number = models.CharField(max_length=20)
    bus_type = models.CharField(max_length=100)  # e.g. "Bharat Benz A/C Seater / Sleeper (2+1)"
    from_city = models.CharField(max_length=100)
    to_city = models.CharField(max_length=100)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    duration = models.CharField(max_length=20)  # Store as "HH:mm" format
    seat_type = models.CharField(max_length=20, choices=SEAT_TYPE_CHOICES)
    total_seats = models.IntegerField()
    available_seats = models.IntegerField()
    window_seats = models.IntegerField()
    base_fare = models.DecimalField(max_digits=8, decimal_places=2)
    rating = models.FloatField(default=0.0) # pyright: ignore[reportArgumentType]
    total_ratings = models.IntegerField(default=0) # pyright: ignore[reportArgumentType]
    live_tracking = models.BooleanField(default=False) # pyright: ignore[reportArgumentType]
    amenities = models.JSONField(default=list)  # Store amenities as list
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['from_city', 'to_city']),
            models.Index(fields=['departure_time']),
        ]

    def __str__(self):
        return f"{self.operator.name} - {self.bus_type} ({self.from_city} to {self.to_city})"

class BusSeat(models.Model):
    SEAT_STATUS_CHOICES = [
        ('available', 'Available'),
        ('booked', 'Booked'),
        ('reserved', 'Reserved'),
        ('blocked', 'Blocked'),
    ]

    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name='seats')
    seat_number = models.CharField(max_length=10)
    is_window = models.BooleanField(default=False)  # pyright: ignore[reportArgumentType]
    is_ladies = models.BooleanField(default=False)  # pyright: ignore[reportArgumentType]
    price = models.DecimalField(max_digits=8, decimal_places=2)
    status = models.CharField(max_length=20, choices=SEAT_STATUS_CHOICES, default='available')
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['bus', 'seat_number']

    def __str__(self):
        return f"{self.bus.bus_number} - Seat {self.seat_number}"

class BusBooking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bus_bookings')
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, related_name='bookings')
    seats = models.ManyToManyField(BusSeat, related_name='bookings')
    booking_date = models.DateTimeField(auto_now_add=True)
    travel_date = models.DateField()
    total_fare = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    cancellation_allowed = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Booking {self.id} - {self.user.username} ({self.bus.bus_number})"
    
class Property(models.Model):
    PROPERTY_TYPE_CHOICES = [
        ('cabin', 'Mountain Cabin'),
        ('houseboat', 'Houseboat'),
        ('desert_camp', 'Desert Camp'),
        ('villa', 'Villa'),
        ('cottage', 'Cottage'),
        ('treehouse', 'Treehouse'),
        # Add more as needed
    ]

    host = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='properties')
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=50, choices=PROPERTY_TYPE_CHOICES)
    location = models.CharField(max_length=200)  # e.g. "Himachal Pradesh, India"
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    description = models.TextField()
    max_guests = models.IntegerField()
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.FloatField(default=0.0)  # pyright: ignore[reportArgumentType]
    total_ratings = models.IntegerField(default=0)  # pyright: ignore[reportArgumentType]
    instant_book = models.BooleanField(default=False)   # pyright: ignore[reportArgumentType]
    verified_host = models.BooleanField(default=False)  # pyright: ignore[reportArgumentType]
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Property Features
    amenities = models.JSONField(default=list)  # ['WiFi', 'Parking', 'Kitchen', etc]
    photos = models.JSONField(default=list)  # List of photo URLs
    photo_count = models.IntegerField(default=0)   # pyright: ignore[reportArgumentType]
    is_active = models.BooleanField(default=True)  # pyright: ignore[reportArgumentType]
    
    class Meta:
        verbose_name_plural = 'Properties'
        indexes = [
            models.Index(fields=['city', 'state']),
            models.Index(fields=['price_per_night']),
            models.Index(fields=['rating']),
        ]

    def __str__(self):
        return f"{self.name} - {self.location}"

class PropertyAvailability(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='availability')
    date = models.DateField()
    is_available = models.BooleanField(default=True)  # pyright: ignore[reportArgumentType]
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    minimum_stay = models.IntegerField(default=1)  # pyright: ignore[reportArgumentType]
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['property', 'date']
        verbose_name_plural = 'Property Availabilities'

    def __str__(self):
        return f"{self.property.name} - {self.date}"

class PropertyReview(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.FloatField()
    comment = models.TextField()
    cleanliness_rating = models.IntegerField()
    location_rating = models.IntegerField()
    value_rating = models.IntegerField()
    amenities_rating = models.IntegerField()
    photos = models.JSONField(default=list)  # Review photos
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['property', 'user']
        indexes = [models.Index(fields=['rating'])]

    def __str__(self):
        return f"Review for {self.property.name} by {self.user.username}"

class PropertyBooking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]

    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='bookings')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='property_bookings')
    check_in = models.DateField()
    check_out = models.DateField()
    guests = models.IntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    booking_date = models.DateTimeField(auto_now_add=True)
    special_requests = models.TextField(blank=True)
    cancellation_policy = models.TextField()
    house_rules_accepted = models.BooleanField(default=False) # pyright: ignore[reportArgumentType]
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['check_in', 'check_out']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.user.username}'s booking at {self.property.name}"

class OAuthProfile(models.Model):
    PROVIDER_CHOICES = [
        ('google', 'Google'),
        ('facebook', 'Facebook'),
        ('github', 'GitHub'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='oauth_profile')
    provider = models.CharField(max_length=20, choices=PROVIDER_CHOICES)
    provider_user_id = models.CharField(max_length=255, unique=True)
    access_token = models.TextField(blank=True, null=True)
    refresh_token = models.TextField(blank=True, null=True)
    token_expires_at = models.DateTimeField(blank=True, null=True)
    profile_picture = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['provider', 'provider_user_id']
        verbose_name_plural = 'OAuth Profiles'

    def __str__(self):
        return f"{self.user.name} - {self.provider}"
    


class Cab(models.Model):
    SEAT_TYPE_CHOICES = [
        ('4seater', '4 Seater'),
        ('6seater', '6 Seater'),
        ('8seater', '8 Seater'),
    ]
    CAR_TYPE_CHOICES = [
        ('sedan', 'Sedan'),
        ('suv', 'SUV'),
        ('hatchback', 'Hatchback'),
        ('mini_van', 'Mini Van'),
    ]

    operator = models.ForeignKey(BusOperator, on_delete=models.CASCADE, related_name='buses')
    car_number = models.CharField(max_length=20)
    car_type = models.CharField(max_length=100)  # e.g. "Bharat Benz A/C Seater / Sleeper (2+1)"
    from_city = models.CharField(max_length=100)
    to_city = models.CharField(max_length=100)
    arrival_time = models.DateTimeField()
    duration = models.CharField(max_length=20)  # Store as "HH:mm" format
    seat_type = models.CharField(max_length=20, choices=SEAT_TYPE_CHOICES)
    car_type = models.CharField(max_length=100, choices=CAR_TYPE_CHOICES)
    base_fare = models.DecimalField(max_digits=8, decimal_places=2)
    rating = models.FloatField(default=0.0) # pyright: ignore[reportArgumentType]
    total_ratings = models.IntegerField(default=0) # pyright: ignore[reportArgumentType]
    live_tracking = models.BooleanField(default=False) # pyright: ignore[reportArgumentType]
    amenities = models.JSONField(default=list)  # Store amenities as list
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['from_city', 'to_city']),
            models.Index(fields=['arrival_time']),
        ]

    def __str__(self):
        return f"{self.operator.name} - {self.car_type} ({self.from_city} to {self.to_city})"
    
class CabOperator(models.Model):
    name = models.CharField(max_length=200)  # e.g. "UPSRTC", "Laxmi holidays"
    logo = models.URLField(blank=True)
    description = models.TextField()  # e.g. "Uttar Pradesh State Road Transport Corporation"
    rating = models.FloatField(default=0.0) # pyright: ignore[reportArgumentType]
    total_buses = models.IntegerField(default=0) # pyright: ignore[reportArgumentType]
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

