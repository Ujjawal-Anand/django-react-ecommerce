from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from django_apps.cart.models import Product
from .serializers import ProductSerializer

class ProductListView(ListAPIView):
    permission_classes = {AllowAny}
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


