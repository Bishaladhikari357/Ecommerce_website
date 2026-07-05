from django.urls import path

from .views import (
    ProductListAPIView,
    ProductDetailAPIView,
    BlogListAPIView,
    BlogDetailAPIView,
    ContactCreateAPIView,
    SliderListAPIView,
    RotatorImageListAPIView,

    # Cart
    get_cart,
    add_to_cart,
    update_cart_item,
    remove_item,

    # Checkout
    checkout,
)

urlpatterns = [

    # ==========================
    # Products
    # ==========================
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

    # ==========================
    # Blogs
    # ==========================
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

    # ==========================
    # Contact
    # ==========================
    path(
        "contact/",
        ContactCreateAPIView.as_view(),
        name="contact-create",
    ),

    # ==========================
    # Slider
    # ==========================
    path(
        "slider/",
        SliderListAPIView.as_view(),
        name="slider",
    ),

    # ==========================
    # Rotator Images
    # ==========================
    path(
        "rotator-images/",
        RotatorImageListAPIView.as_view(),
        name="rotator-images",
    ),

    # ==========================
    # Cart
    # ==========================
    path(
        "cart/",
        get_cart,
        name="get-cart",
    ),

    path(
        "cart/add/",
        add_to_cart,
        name="add-to-cart",
    ),

    path(
        "cart/update/<int:id>/",
        update_cart_item,
        name="update-cart-item",
    ),

    path(
        "cart/remove/<int:id>/",
        remove_item,
        name="remove-item",
    ),

    # ==========================
    # Checkout
    # ==========================
    path(
        "checkout/",
        checkout,
        name="checkout",
    ),
]