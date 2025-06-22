from django.db import models
from accounts.models import CustomUser
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.

class Food(models.Model):
    CATEGORY_CHOICES = [
        ('salad', 'Salad'),
        ('rolls', 'Rolls'),
        ('pasta', 'Pasta'),
        ('desserts', 'Desserts'),
        ('noodles', 'Noodles'),
        ('sandwiches', 'Sandwiches'),
    ]

    name=models.CharField(max_length=100)
    price=models.DecimalField(max_digits=6, decimal_places=2)
    image=models.ImageField(upload_to='food_images/')
    category=models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.name
    
class Cart(models.Model):
    user= models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='cart'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user',)

    def __str__(self):
        return f"Cart for {self.user.email}"
    
    def clean(self):
        if Cart.objects.filter(user=self.user).exclude(pk=self.pk).exists():
            raise ValidationError('User already has a cart')
    
class CartItem(models.Model):
    cart= models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name='items'
    )
    food=models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('cart', 'food')

    def __str__(self):
        return f"{self.quantity} x {self.food.name} in {self.cart}"
    

    @property
    def total_price(self):
        return self.food.price * self.quantity
    