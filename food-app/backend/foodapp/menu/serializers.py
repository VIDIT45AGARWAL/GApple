from rest_framework import serializers
from .models import Food, CartItem, Cart, Order, OrderItems
from django.contrib.auth import get_user_model
from cloudinary.utils import cloudinary_url
import cloudinary.uploader

User = get_user_model()

class FoodSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()
    image = serializers.ImageField(write_only=True, required=True)

    price = serializers.DecimalField(
        max_digits=6,
        decimal_places=2,
        coerce_to_string=False
    )

    class Meta:
        model=Food
        fields = '__all__'
        read_only_fields = ('image_url',)
    
    def get_image_url(self, obj):
        if obj.image:
            
            if hasattr(obj.image, 'url'):
                return obj.image.url
            
            elif isinstance(obj.image, str):
                url, _ = cloudinary_url(obj.image, format='auto', secure=True)
                return url
        return None

    def create(self, validated_data):
        image_file = validated_data.pop('image', None)
        
        if image_file:
            upload_result = cloudinary.uploader.upload(
                image_file,
                folder='food_images'
            )
            validated_data['image'] = upload_result['public_id']
        
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        image_file = validated_data.pop('image', None)
        
        if image_file:
            upload_result = cloudinary.uploader.upload(
                image_file,
                folder='food_images'
            )
            validated_data['image'] = upload_result['public_id']
        
        return super().update(instance, validated_data)


class CartItemSerializer(serializers.ModelSerializer):
    food_id = serializers.PrimaryKeyRelatedField(
        queryset=Food.objects.all(),
        source='food',
        # write_only=True
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
    

class OrderItemSerializer(serializers.ModelSerializer):
    food_name= serializers.CharField(source='food.name')
    food_image= serializers.CharField(source='food.image')

    class Meta:
        model= OrderItems
        fields=['food', 'food_name', 'food_image', 'quantity', 'price', 'total_price']


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields=['id', 'user', 'created_at', 'updated_at', 'status', 'total_amount', 'firstName', 'lastName', 'email', 'address', 'pincode', 'phoneNo', 'items']
        read_only_fields=['id', 'user', 'created_at', 'updated_at', 'status', 'items']
    
    def create(self, validated_data):
        request=self.context.get('request')
        user= request.user
        print('Validated Data', validated_data)
        #get cart and its items
        cart=Cart.objects.get(user=user)
        cart_items=cart.items.all()
        print('Cart Items:', cart_items)
        if not cart_items:
            raise serializers.ValidationError('Cart is empty')
        
        order= Order.objects.create(
            user=user,
            total_amount=validated_data['total_amount'],
            firstName=validated_data['firstName'],
            lastName=validated_data['lastName'],
            email=validated_data['email'],
            address=validated_data['address'],
            pincode=validated_data['pincode'],
            phoneNo=validated_data['phoneNo']
        )
        

        for item in cart_items:
            OrderItems.objects.create(
                order=order,
                food=item.food,
                quantity=item.quantity,
                price=item.food.price,
            )
        

        cart.items.all().delete()

        return order