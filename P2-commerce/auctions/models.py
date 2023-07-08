from django.contrib.auth.models import AbstractUser
from django.db import models

""" 
each time you change anything in auctions/models.py, you’ll need to first run 
        python manage.py makemigrations 
    and then 
        python manage.py migrate to migrate 
    those changes to your database.

RESET DB:
    rm  your_app/migrations/* 
    rm db.sqlite3

"""

global categories
categories = [('f', 'fashion'), ('t', 'toys'), ('e', 'electronics'), ('h', 'home')]


class User(AbstractUser):
    # inherits from AbstractUser, it will already have fields for a username, email, password
    
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=64)
    
    def __str__(self):
        return f"USER: {self.id}: {self.name}"

class Listing(models.Model):
    id = models.IntegerField(primary_key=True)
    uid = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    desc = models.CharField(max_length=250, default='DESCRIPTION')
    initBid = models.DecimalField(decimal_places=2, max_digits=6)
    img_url = models.URLField(blank=True, default='')
    cat = models.CharField(max_length=1, choices=categories, blank=True, default='')

    def __str__(self):
        return f"LISTING: {self.id}: {self.name}"

class Bid(models.Model):
    id = models.IntegerField(primary_key=True)
    lid = models.ForeignKey(Listing, on_delete=models.CASCADE)
    uid = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(decimal_places=2, max_digits=6)

    def __str__(self):
        return f"BID: {self.id} LID: {self.lid} UID: {self.uid} Amount: {self.amount}"


class Comment():
    id = models.IntegerField(primary_key=True)
    lid = models.ForeignKey(Listing, on_delete=models.CASCADE)
    uid = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=128)
    
    def __str__(self):
        return f"BID: {self.id} LID: {self.lid} UID: {self.uid} Text: {self.text}"
