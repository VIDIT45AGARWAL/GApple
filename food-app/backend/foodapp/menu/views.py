from django.shortcuts import render
from rest_framework import viewsets
from .models import Food
from .serializers import FoodSerializer

# Create your views here.
class FoodViewSet(viewsets.ModelViewSet):
    queryset=Food.objects.all()
    serializer_class=FoodSerializer

    def get_queryset(self):
        category = self.request.query_params.get('category')
        if category:
            return Food.objects.filter(category=category)
        return Food.objects.all()
