from rest_framework import generics
from .models import Product, Blog, Contact
from .serializers import ProductSerializer, BlogSerializer, ContactSerializer
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