from rest_framework import serializers
from .models import (
    Product,
    Blog,
    Contact,
    Slider,
    Rotation,
    Cart,
    CartItem,
    Order,
    OrderItem,
)


# ==========================
# Product
# ==========================
class ProductSerializer(serializers.ModelSerializer):
    final_price = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = "__all__"


# ==========================
# Blog
# ==========================
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = "__all__"


# ==========================
# Contact
# ==========================
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"


# ==========================
# Slider
# ==========================
class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = "__all__"


# ==========================
# Rotation Images
# ==========================
class RotatorImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rotation
        fields = "__all__"


# ==========================
# Cart Item
# ==========================
class CartItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.name",
        read_only=True,
    )

    image = serializers.CharField(
        source="product.image",
        read_only=True,
    )

    price = serializers.DecimalField(
        source="product.final_price",
        max_digits=10,
        decimal_places=2,
        read_only=True,
    )

    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = [
            "id",
            "product",
            "product_name",
            "image",
            "price",
            "quantity",
            "subtotal",
        ]

    def get_subtotal(self, obj):
        return obj.product.final_price * obj.quantity


# ==========================
# Cart
# ==========================
class CartSerializer(serializers.ModelSerializer):

    items = CartItemSerializer(
        many=True,
        read_only=True,
    )

    total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = [
            "id",
            "user",
            "items",
            "total",
            "created_at",
            "updated_at",
        ]

    def get_total(self, obj):
        total = 0

        for item in obj.items.all():
            total += item.product.final_price * item.quantity

        return total


# ==========================
# Order Item
# ==========================
class OrderItemSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.name",
        read_only=True,
    )

    image = serializers.CharField(
        source="product.image",
        read_only=True,
    )

    class Meta:
        model = OrderItem
        fields = "__all__"


# ==========================
# Order
# ==========================
class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Order
        fields = "__all__"