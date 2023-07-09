from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django import forms

from .models import User, Listing, Comment, Watchlist


def index(request):
    return render(request, "auctions/index.html", {
        "listings": Listing.objects.all().filter(active=True)
    })

""" 
renders a login form when a user tries to GET the page

When a user submits the form using the POST request method, 
    the user is authenticated, logged in, and redirected to the index page
"""
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")

""" 
logs the user out and redirects them to the index page. 
"""
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

""" 
displays a registration form to the user, and creates a new user when the form is submitted.
"""
def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")

class NewListingForm(forms.Form):
    categories = [('f', 'fashion'), ('t', 'toys'), ('e', 'electronics'), ('h', 'home')]
    name = forms.CharField(label="Name", max_length=50)
    desc = forms.CharField(label="Description", widget=forms.Textarea())
    startPrice = forms.DecimalField(decimal_places=2, max_digits=6)
    imgURL = forms.URLField(required= False)
    cat = forms.ChoiceField(choices = categories, required=False, initial='' )
    
def create_listing(request):
    if request.method == "POST":
        
        # Take in the data the user submitted and save it as form
        form = NewListingForm(request.POST)
        
        if form.is_valid():
            author = request.user
            name = form.cleaned_data["name"]
            desc = form.cleaned_data["desc"]
            startPrice = form.cleaned_data["startPrice"]
            imgURL = form.cleaned_data["imgURL"]
            cat = form.cleaned_data["cat"]

            #Add the new entry to our list of entrys
            try: 
                newList = Listing.objects.create(author = author, name = name, desc = desc, startPrice = startPrice, curBid = 0.00, active = True, imgURL = imgURL, cat = cat)
                newList.save()
            # check for duplicate
            except IntegrityError:
                return render(request, "auctions/create.html", {
                "message": "Listing Name already taken."
            })

            # Redirect user to list of entrys
            return HttpResponseRedirect(reverse("create_listing"))

        else:
            # If the form is invalid, re-render the page with existing information.
            return render(request, "auctions/create.html", {
                "form": form,
                "heading": 'Create Listing'
            })
    else:
        return render(request, "auctions/create.html", {
            "form": NewListingForm(),
            "heading": 'Create Listing'
        })
    
def open_listing(request, listid):
    target = Listing.objects.get(id=listid)
    author = request.user
    try: 
        watchlisted = Watchlist.objects.get(author=author, listing=target).exists()
    except Watchlist.DoesNotExist:
        watchlisted = False
    watchlisted = True
    return render(request, "auctions/open.html", {
        "listID": target.id,
        "name": target.name,
        "imgURL": target.imgURL,
        "startPrice": target.startPrice,
        "curBid": target.curBid,
        # "bidCount": target.name,
        "author": target.author,
        "cat": target.get_cat_display,
        "form": OpenBidForm(),
        "watchlisted": watchlisted
        
    })
    
class OpenBidForm(forms.Form):
    bid = forms.DecimalField(label='Bid', decimal_places=2, max_digits=6)

def place_bid(request, listid):
    target = Listing.objects.get(id=listid )

    if request.method == "POST":
        form = OpenBidForm(request.POST)

        if form.is_valid():
            author = request.user
            bid = form.cleaned_data["bid"]

            # Update the listing with the new bid value
            target.curBid = bid
            target.save()

            # Redirect user to the open listing page
            return HttpResponseRedirect(reverse("open_listing", args=[listid]))
    else:
        form = OpenBidForm()

    return render(request, "auctions/open.html", {
        "form": form,
        "name": target.name,
        "imgURL": target.imgURL,
        "startPrice": target.startPrice,
        "curBid": target.curBid,
        "author": target.author,
        "cat": target.get_cat_display,
    })

