from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Post(models.Model):
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    """ 
     In this updated schema, the followers field is a ManyToManyField that establishes a relationship between users 
        (followers) and profiles (being followed). Each user can follow multiple profiles, and each profile can have 
        multiple followers.
       """
    followers = models.ManyToManyField(User, related_name='follower_profiles')
    following = models.ManyToManyField(User, related_name='following_profiles')


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    is_liked = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)

