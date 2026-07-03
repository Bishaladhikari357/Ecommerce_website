from django.db import models

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