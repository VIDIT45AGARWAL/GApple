from rest_framework import serializers
from .models import Food

class FoodSerializer(serializers.ModelSerializer):

    price = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        coerce_to_string=False
    )

    class Meta:
        model=Food
        fields = '__all__'