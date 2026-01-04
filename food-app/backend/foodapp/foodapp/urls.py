"""
URL configuration for foodapp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from menu.views import FoodViewSet, CartViewSet, OrderViewSet, create_checkout_session, AdminOrderListView, UserOrderListView
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'foods', FoodViewSet, basename='food')
router.register(r'carts', CartViewSet, basename='cart')
router.register(r'order', OrderViewSet, basename='order')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/order/admin_list/', AdminOrderListView.as_view(), name='admin-order-list'),
    path('api/order/user_list/', UserOrderListView.as_view(), name='user-order-list'),
    path('api/auth/', include('accounts.urls')),
    path('api/', include(router.urls)),
    path('create-checkout-session/<int:order_id>/', create_checkout_session),
]
