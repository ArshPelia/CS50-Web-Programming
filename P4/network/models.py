from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            # Add any other fields you want to include in the serialization
        }

class Post(models.Model):
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')

    def serialize(self):
        return {
            'id': self.id,
            'content': self.content,
            'timestamp': self.timestamp.isoformat(),
            'user': self.user.serialize(),
            # Add any other fields you want to include in the serialization
        }

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    followers = models.ManyToManyField(User, related_name='follower_profiles')
    following = models.ManyToManyField(User, related_name='following_profiles')

    def serialize(self):
        return {
            'id': self.id,
            'user': self.user.serialize(),
            'followers': [follower.serialize() for follower in self.followers.all()],
            'following': [following.serialize() for following in self.following.all()],
            # Add any other fields you want to include in the serialization
        }

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    is_liked = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            'id': self.id,
            'user': self.user.serialize(),
            'post': self.post.serialize(),
            'is_liked': self.is_liked,
            'timestamp': self.timestamp.isoformat(),
            # Add any other fields you want to include in the serialization
        }
