from django.contrib import admin
from .models import Property, Bus, Train, Homestay, BusOperator, PropertyAvailability, PropertyReview, BusBooking, PropertyBooking

# Register your models here.
admin.site.register(Property)
admin.site.register(Bus)
admin.site.register(Train)
admin.site.register(Homestay)
admin.site.register(BusOperator)
admin.site.register(PropertyAvailability)
admin.site.register(PropertyReview)
admin.site.register(BusBooking)
admin.site.register(PropertyBooking)

