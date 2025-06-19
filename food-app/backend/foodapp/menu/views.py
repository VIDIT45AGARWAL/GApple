from django.shortcuts import render
from rest_framework import viewsets
from .models import Food
from .serializers import FoodSerializer
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.
class FoodViewSet(viewsets.ModelViewSet):
    queryset=Food.objects.all()
    serializer_class=FoodSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        category = self.request.query_params.get('category')
        if category:
            return Food.objects.filter(category=category)
        return Food.objects.all()
    
    def perform_create(self, serializer):
        serializer.save()
        