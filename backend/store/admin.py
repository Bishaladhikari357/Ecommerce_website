from django.contrib import admin
from .models import Product, Blog, Contact


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
    )

    prepopulated_fields = {
        "slug": ("name",)
    }

#for blogs
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