from django.urls import path

from .views import (
    ProductListAPIView,
    ProductDetailAPIView,
    BlogListAPIView,
    BlogDetailAPIView,
    ContactCreateAPIView,
)

urlpatterns = [
    # Products
    path(
        "products/",
        ProductListAPIView.as_view(),
        name="product-list",
    ),
    path(
        "products/<slug:slug>/",
        ProductDetailAPIView.as_view(),
        name="product-detail",
    ),

    # Blogs
    path(
        "blogs/",
        BlogListAPIView.as_view(),
        name="blog-list",
    ),
    path(
        "blogs/<slug:slug>/",
        BlogDetailAPIView.as_view(),
        name="blog-detail",
    ),

    # Contact
    path(
        "contact/",
        ContactCreateAPIView.as_view(),
        name="contact-create",
    ),
]