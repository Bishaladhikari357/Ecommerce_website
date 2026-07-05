from rest_framework import generics
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
from .serializers import (
    ProductSerializer,
    BlogSerializer,
    ContactSerializer,
    SliderSerializer,
    RotatorImageSerializer,
    CartSerializer,
    CartItemSerializer,
    OrderSerializer,
)
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from django.db import transaction
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail



class ProductListAPIView(generics.ListAPIView):
    queryset = Product.objects.filter(is_available=True)
    serializer_class = ProductSerializer


class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_available=True)
    serializer_class = ProductSerializer
    lookup_field = "slug"

class BlogListAPIView(generics.ListAPIView):
    queryset = Blog.objects.filter(
        is_published=True
    ).order_by("-created_at")

    serializer_class = BlogSerializer


class BlogDetailAPIView(generics.RetrieveAPIView):
    queryset = Blog.objects.filter(
        is_published=True
    )

    serializer_class = BlogSerializer

    lookup_field = "slug"

# Contact
class ContactCreateAPIView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        data = serializer.validated_data

        send_mail(
            subject=f"New Contact: {data['subject']}",
            message=f"""
Name: {data['name']}

Email: {data['email']}

Message:

{data['message']}
""",
            from_email=None,
            recipient_list=["bishala408@gmail.com"],
            fail_silently=False,
        )

        return Response(
            {
                "message": "Message sent successfully."
            },
            status=status.HTTP_201_CREATED,
        )

#for slider
class SliderListAPIView(generics.ListAPIView):
    serializer_class = SliderSerializer

    def get_queryset(self):
        return Slider.objects.filter(is_active=True).order_by("order")


#for rotator image
class RotatorImageListAPIView(generics.ListAPIView):
    serializer_class = RotatorImageSerializer

    def get_queryset(self):
        return Rotation.objects.filter(
            is_active=True
        ).order_by("order")

# Get Cart
@api_view(["GET"])
def get_cart(request):

    if not request.user.is_authenticated:
        return Response(
            {"error": "Please login first."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    cart, created = Cart.objects.get_or_create(user=request.user)

    serializer = CartSerializer(cart)

    return Response(serializer.data)


# Add To Cart
@api_view(["POST"])
def add_to_cart(request):

    if not request.user.is_authenticated:
        return Response(
            {"error": "Please login first."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    product_id = request.data.get("product")
    quantity = int(request.data.get("quantity", 1))

    product = get_object_or_404(Product, id=product_id)

    if quantity > product.stock:
        return Response(
            {"error": "Not enough stock"},
            status=status.HTTP_400_BAD_REQUEST
        )

    cart, created = Cart.objects.get_or_create(user=request.user)

    item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product
    )

    if created:
        item.quantity = quantity
    else:
        if item.quantity + quantity > product.stock:
            return Response(
                {"error": "Stock exceeded"},
                status=status.HTTP_400_BAD_REQUEST
            )

        item.quantity += quantity

    item.save()

    serializer = CartSerializer(cart)

    return Response(serializer.data)


# Update Cart Item
@api_view(["PATCH"])
def update_cart_item(request, id):

    if not request.user.is_authenticated:
        return Response(
            {"error": "Please login first."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    item = get_object_or_404(
        CartItem,
        id=id,
        cart__user=request.user
    )

    quantity = int(request.data.get("quantity"))

    if quantity <= 0:
        item.delete()
        return Response({"message": "Item removed"})

    if quantity > item.product.stock:
        return Response(
            {"error": "Not enough stock"},
            status=status.HTTP_400_BAD_REQUEST
        )

    item.quantity = quantity
    item.save()

    serializer = CartSerializer(item.cart)

    return Response(serializer.data)


# Remove Item
@api_view(["DELETE"])
def remove_item(request, id):

    if not request.user.is_authenticated:
        return Response(
            {"error": "Please login first."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    item = get_object_or_404(
        CartItem,
        id=id,
        cart__user=request.user
    )

    item.delete()

    return Response(
        {"message": "Item removed successfully"},
        status=status.HTTP_200_OK
    )

# Checkout
@api_view(["POST"])
@transaction.atomic
def checkout(request):

    if not request.user.is_authenticated:
        return Response(
            {"error": "Please login first."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    cart = get_object_or_404(Cart, user=request.user)

    if not cart.items.exists():
        return Response(
            {"error": "Cart is empty"},
            status=status.HTTP_400_BAD_REQUEST
        )

    order = Order.objects.create(
        user=request.user,
        status="Pending",      # if your Order model has status
        total=0
    )

    total = 0

    for item in cart.items.select_related("product"):

        product = item.product

        # Check stock
        if product.stock < item.quantity:
            return Response(
                {
                    "error": f"{product.name} has only {product.stock} item(s) left."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        subtotal = product.final_price * item.quantity

        # Create Order Item
        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=item.quantity,
            price=product.final_price,
            subtotal=subtotal
        )

        # Decrease Product Stock
        Product.objects.filter(pk=product.pk).update(
            stock=F("stock") - item.quantity
        )

        total += subtotal

    # Save Order Total
    order.total = total
    order.save()

    # Empty Cart
    cart.items.all().delete()

    return Response(
        OrderSerializer(order).data,
        status=status.HTTP_201_CREATED
    )