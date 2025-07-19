from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Food, Cart, CartItem, Order
from .serializers import FoodSerializer, CartItemSerializer, CartSerializer, OrderSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.decorators import action, api_view, permission_classes
import stripe
from django.conf import settings
from rest_framework.views import APIView


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
    

class OrderViewSet(viewsets.ModelViewSet):
    queryset= Order.objects.all()
    serializer_class= OrderSerializer
    permission_classes= [IsAuthenticated]




stripe.api_key=settings.STRIPE_SECRET_KEY
@api_view(['POST'])
@permission_classes([IsAuthenticated])

def create_checkout_session(request, order_id):
        try:
            order=Order.objects.get(pk=order_id, user=request.user)
            line_items=[]
            for item in order.items.all():
                line_items.append({
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': item.food.name,
                        },
                        'unit_amount': int(item.price * 100)
                    },
                    'quantity': item.quantity,
                })


            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=line_items,
                mode='payment',
                success_url='http://localhost:5173/order-placed',
                cancel_url='http://localhost:5173/order-placed',
                customer_email=order.email,
                metadata={'order_id': order.id}
            )

            return Response({'checkout_url': checkout_session.url})

        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

class AdminOrderListView(APIView):
    permission_classes=[IsAdminUser]

    def get(self, request):
        try:
            orders= Order.objects.all().order_by('-created_at')
            serializer=OrderSerializer(orders, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        

class UserOrderListView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self, request):
        try:
            orders=Order.objects.filter(user=request.user).order_by('-created_at')
            serializer=OrderSerializer(orders, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)