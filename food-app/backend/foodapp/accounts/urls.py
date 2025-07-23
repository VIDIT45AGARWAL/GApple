from django.urls import path
from .views import UserRegistrationAPIView, UserLoginAPIView, UserLogoutAPIView, UserProfileAPIView, VerifyEmailOTPView

urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view(), name='user-register'),
    path('login/', UserLoginAPIView.as_view(), name='user-login'),
    path('logout/', UserLogoutAPIView.as_view(), name='user-logout'),
    path('user/', UserProfileAPIView.as_view(), name='user-profile'),
    path('verify-email-otp/', VerifyEmailOTPView.as_view(), name='verify-email-otp'),
]