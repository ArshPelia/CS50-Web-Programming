from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    followers = models.ManyToManyField('self', symmetrical=False,
                                       blank=True)

    def count_followers(self):
        return self.followers.count()

    def count_following(self):
        return User.objects.filter(followers=self).count()


class Post(models.Model):
    author = models.ForeignKey("User", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField(blank=False)


class Like(models.Model):
    Post = models.ForeignKey("Post", on_delete=models.CASCADE)
    author = models.ForeignKey("User", on_delete=models.CASCADE)


class Comment(models.Model):
    Post = models.ForeignKey("Post", on_delete=models.CASCADE)
    author = models.ForeignKey("User", on_delete=models.CASCADE)
    content = models.TextField(blank=False)
