from django.contrib.auth.models import AbstractUser
from django.db import models

""" 

Models represent SQL tables that django will maintain in db.sqlite3

each time you change anything in auctions/models.py, you’ll need to first run 
        python manage.py makemigrations 
    and then 
        python manage.py migrate to migrate 
    those changes to your database.

RESET DB:
    rm  your_app/migrations/* 
    rm db.sqlite3
    python manage.py makemigrations auctions
    python manage.py makemigrations
    python manage.py migrate

"""

global categories
categories = [('f', 'fashion'), ('t', 'toys'), ('e', 'electronics'), ('h', 'home')]


class User(AbstractUser):
    # inherits from AbstractUser, it will already have fields for a username, email, password
    
    def __str__(self):
        return f"USER: {self.id}: {self.username}"

class Listing(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    desc = models.CharField(max_length=250, default='DESCRIPTION')
    startPrice = models.DecimalField(decimal_places=2, max_digits=6)
    curBid = models.DecimalField(decimal_places=2, max_digits=6)
    active = models.BooleanField(default='TRUE')
    imgURL = models.URLField(blank=True, default='')
    cat = models.CharField(max_length=1, choices=categories, blank=True, default='')

    def __str__(self):
        return f"LISTING: {self.id}: {self.name}"

class Bid(models.Model):
    lid = models.ForeignKey(Listing, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(decimal_places=2, max_digits=6)

    def __str__(self):
        return f"BID: {self.id} LID: {self.lid} user: {self.author} Amount: {self.amount}"


class Comment(models.Model):
    lid = models.ForeignKey(Listing, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=128)
    
    def __str__(self):
        return f"BID: {self.id} LID: {self.lid} user: {self.author} Text: {self.text}"
    
class Watchlist(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    listings = models.ForeignKey(Listing, on_delete=models.CASCADE)

    def __str__(self):
        return f"Watchlist: {self.id} User: {self.author}"
    
