from django.contrib import admin
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


# ===========================
# Product
# ===========================
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "brand",
        "category",
        "price",
        "discount",
        "stock",
        "is_available",
        "is_featured",
        "created_at",
    )

    search_fields = (
        "name",
        "brand",
        "category",
    )

    list_filter = (
        "category",
        "brand",
        "is_available",
        "is_featured",
    )

    prepopulated_fields = {
        "slug": ("name",)
    }


# ===========================
# Blog
# ===========================
@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "author",
        "category",
        "views",
        "is_published",
        "created_at",
    )

    search_fields = (
        "title",
        "author",
        "category",
    )

    list_filter = (
        "category",
        "is_published",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }


# ===========================
# Contact
# ===========================
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "email",
        "subject",
        "created_at",
    )

    search_fields = (
        "name",
        "email",
        "subject",
    )

    list_filter = (
        "created_at",
    )

    readonly_fields = (
        "name",
        "email",
        "subject",
        "message",
        "created_at",
    )

    ordering = (
        "-created_at",
    )


# ===========================
# Slider
# ===========================
@admin.register(Slider)
class SliderAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "order",
        "is_active",
        "created_at",
    )

    list_filter = (
        "is_active",
    )

    search_fields = (
        "title",
    )

    list_editable = (
        "order",
        "is_active",
    )


# ===========================
# Rotation
# ===========================
@admin.register(Rotation)
class RotationAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "order",
        "is_active",
        "created_at",
    )

    list_filter = (
        "is_active",
    )

    search_fields = (
        "title",
    )

    list_editable = (
        "order",
        "is_active",
    )

    ordering = (
        "order",
    )


# ===========================
# Cart
# ===========================
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "created_at",
        "updated_at",
    )

    search_fields = (
        "user__username",
    )

    ordering = (
        "-created_at",
    )


# ===========================
# Cart Item
# ===========================
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "cart",
        "product",
        "quantity",
    )

    search_fields = (
        "product__name",
        "cart__user__username",
    )


# ===========================
# Order
# ===========================
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "user",
        "total",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
    )

    search_fields = (
        "user__username",
    )

    ordering = (
        "-created_at",
    )


# ===========================
# Order Item
# ===========================
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "order",
        "product",
        "quantity",
        "price",
        "subtotal",
    )

    search_fields = (
        "product__name",
    )