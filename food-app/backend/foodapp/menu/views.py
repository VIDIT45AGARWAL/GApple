from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Food, Cart, CartItem
from .serializers import FoodSerializer, CartItemSerializer, CartSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action


class FoodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        category = self.request.query_params.get('category')
        if category:
            return Food.objects.filter(category=category)
        return Food.objects.all()
    
    def perform_create(self, serializer):
        serializer.save()

class CartViewSet(viewsets.GenericViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def _get_cart(self):
        cart, created = Cart.objects.get_or_create(user_id=self.request.user.id)
        return cart

    @action(detail=False, methods=['get'])
    def current(self, request):
        cart = self._get_cart()
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add_item(self, request):
        cart = self._get_cart()
        serializer = CartItemSerializer(data=request.data, context={'cart': cart, 'request': request})
        serializer.is_valid(raise_exception=True)
        
        food = serializer.validated_data['food']
        quantity = serializer.validated_data.get('quantity', 1)
        
        
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            food=food,
            defaults={'quantity': quantity}
        )
        
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
            

        
        response_serializer = CartItemSerializer(cart_item, context={'request': request})
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'], url_path='update_item/<int:item_pk>')
    def update_item(self, request, item_pk=None):
        
        cart = self._get_cart()
        
        try:
            cart_item = cart.items.get(id=item_pk)
            serializer = CartItemSerializer(cart_item, data=request.data, partial=True, context={'request': request})
            serializer.is_valid(raise_exception=True)
            
            new_quantity = serializer.validated_data.get('quantity')
            
            if new_quantity <= 0:
                cart_item.delete()
                
                return Response(status=status.HTTP_204_NO_CONTENT)
                
            serializer.save()
            
            return Response(serializer.data)
        except CartItem.DoesNotExist:
            
            return Response(
                {"detail": "Item not found in cart"},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['post'], url_path='remove_item/(?P<item_pk>[^/.]+)')
    def remove_item(self, request, item_pk=None):
        cart = self._get_cart()
        
        try:
            cart_item = cart.items.get(id=item_pk)
            cart_item.delete()
            
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            
            return Response(
                {"detail": "Item not found in cart"},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['delete'])
    def clear(self, request):
        cart = self._get_cart()
       
        cart.items.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)