from rest_framework import serializers
from .models import Food, CartItem, Cart
from django.contrib.auth import get_user_model

User = get_user_model()

class FoodSerializer(serializers.ModelSerializer):

    price = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        coerce_to_string=False
    )

    class Meta:
        model=Food
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    food_id = serializers.PrimaryKeyRelatedField(
        queryset=Food.objects.all(),
        source='food',
        write_only=True
    )
    name = serializers.CharField(source='food.name', read_only=True)
    price = serializers.DecimalField(
        source='food.price',
        max_digits=6,
        decimal_places=2,
        read_only=True
    )
    image = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'food_id', 'name', 'price', 'image', 'quantity']
        extra_kwargs = {
            'quantity': {'min_value': 1}
        }
    
    def get_image(self, obj):
        request = self.context.get('request')
        if request and obj.food.image and hasattr(obj.food.image, 'url'):
            return request.build_absolute_uri(obj.food.image.url)
        return None

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_items = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_items', 'total_price', 'created_at', 'updated_at']
        read_only_fields = ['user', 'total_items', 'total_price']

    def get_total_items(self, obj):
        return sum(item.quantity for item in obj.items.all())

    def get_total_price(self, obj):
        return sum(item.food.price * item.quantity for item in obj.items.all())