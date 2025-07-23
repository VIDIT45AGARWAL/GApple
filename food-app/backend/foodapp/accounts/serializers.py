from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework.authtoken.models import Token
from .utils import generate_otp
from django.core.mail import send_mail
from django.conf import settings

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'first_name', 'last_name')
    
    def create(self, validated_data):
        otp=generate_otp()
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            email_otp=otp,
            is_email_verified=False,
        )

        send_mail(
            'Email Verification OTP',
            f'Your OTP for email verification is: {otp}',
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )

        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'})
    
    def validate(self, data):
        email = data.get('email')
        print(f"Validating login for email: {email}")
        password = data.get('password')
        
        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if user:
                print(f"User authenticated: {user}")
                if not user.is_active:
                    print("User is inactive")
                    msg = 'User account is disabled.'
                    raise serializers.ValidationError(msg)
            else:
                print("Authentication failed")
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg)
        else:
            print("Missing email or password")
            msg = 'Must include "email" and "password".'
            raise serializers.ValidationError(msg)
        
        data['user'] = user
        return data
    

class VerifyEmailOTPSerializer(serializers.Serializer):
    email=serializers.EmailField()
    otp=serializers.CharField(max_length=6)

    def validate(self, data):
        try:
            user=User.objects.get(email=data['email'])
            if user.email_otp!=data['otp']:
                raise serializers.ValidationError('Invalid OTP')
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid Email')
        return data
