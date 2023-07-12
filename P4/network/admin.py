from django.contrib import admin

# Register your models here.
from .models import User, Post, Profile, Like

# Register your models here.
admin.site.register(User)
admin.site.register(Post)
admin.site.register(Profile)
admin.site.register(Like)