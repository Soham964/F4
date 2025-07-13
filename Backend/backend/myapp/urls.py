from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PropertyViewSet, 
    BusViewSet, 
    TrainViewSet, 
    HomestayViewSet, 
    BusOperatorViewSet
)
from .oauth_views import (
    google_oauth,
    facebook_oauth,
    oauth_callback,
    traditional_login,
    traditional_register
)

router = DefaultRouter()
router.register(r'properties', PropertyViewSet)
router.register(r'buses', BusViewSet)
router.register(r'trains', TrainViewSet)
router.register(r'homestays', HomestayViewSet)
router.register(r'bus-operators', BusOperatorViewSet)

# OAuth and Authentication URLs
auth_urlpatterns = [
    path('auth/google/', google_oauth, name='google_oauth'),
    path('auth/facebook/', facebook_oauth, name='facebook_oauth'),
    path('auth/oauth/callback/', oauth_callback, name='oauth_callback'),
    path('auth/login/', traditional_login, name='traditional_login'),
    path('auth/register/', traditional_register, name='traditional_register'),
]

urlpatterns = router.urls + auth_urlpatterns