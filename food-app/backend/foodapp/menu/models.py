from django.db import models

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