from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)

    brand = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    image = models.URLField(max_length=200, blank=True, null=True)

    description = models.TextField()

    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.PositiveIntegerField(default=0)

    stock = models.PositiveIntegerField(default=0)

    

    is_available = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def final_price(self):
        return self.price - (self.price * self.discount / 100)

    def __str__(self):
        return self.name

#for blogs
class Blog(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    author = models.CharField(max_length=100)

    category = models.CharField(max_length=100)

    image = models.URLField(max_length=200, blank=True, null=True)
    
    short_description = models.CharField(max_length=300)

    content = models.TextField()

    tags = models.CharField(
        max_length=200,
        blank=True,
        help_text="Example: Django,Python,NextJS"
    )

    is_published = models.BooleanField(default=True)

    views = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

# Contact
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject

#for slider


class Slider(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)

    # Cloudinary Image URL
    image = models.URLField(max_length=500)

    button_text = models.CharField(max_length=50, default="Shop Now")
    button_link = models.CharField(max_length=255, blank=True)

    order = models.PositiveIntegerField(default=0)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title

# for image Rotator
class Rotation(models.Model):
    title = models.CharField(max_length=200)
    image = models.URLField()

    order = models.PositiveIntegerField(default=0)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


#for cart
class Cart(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="cart"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Cart"

#for cart items
class CartItem(models.Model):

    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name="items"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="cart_items"
    )

    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ("cart", "product")

    @property
    def subtotal(self):
        return self.product.final_price * self.quantity

    def __str__(self):
        return self.product.name

#for order
class Order(models.Model):

    STATUS = [
        ("Pending", "Pending"),
        ("Processing", "Processing"),
        ("Shipped", "Shipped"),
        ("Delivered", "Delivered"),
        ("Cancelled", "Cancelled"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="orders"
    )

    total = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS,
        default="Pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id}"


#for order items
class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items"
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        if not self.pk:
            if self.product.stock < self.quantity:
                raise ValueError("Not enough stock")

            self.product.stock -= self.quantity
            self.product.save()

        super().save(*args, **kwargs)