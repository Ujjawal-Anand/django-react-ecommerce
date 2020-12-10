from rest_framework import serializers

from django_apps.cart.models import Product;

class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = (
                 'id',
                 'title',
                  'slug',
                  'image',
                  'description',
                  'price',
                  'created',
                  'updated',
                  'active',
                  'available_colors',
                  'available_sizes',
                  'primary_category',)

    