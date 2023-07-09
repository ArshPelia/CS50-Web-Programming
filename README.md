# CS50 Web Programming
 Python & JavaScript

# run
Start the project by running 'python manage.py runserver'

# TODO: project2

If the user is signed in and is the one who created the listing, the user should have the ability to “close” the auction from this page, which makes the highest bidder the winner of the auction and makes the listing no longer active.

If a user is signed in on a closed listing page, and the user has won that auction, the page should say so.

Users who are signed in should be able to add comments to the listing page. The listing page should display all comments that have been made on the listing.

Watchlist: Users who are signed in should be able to visit a Watchlist page, which should display all of the listings that a user has added to their watchlist. Clicking on any of those listings should take the user to that listing’s page.

Categories: Users should be able to visit a page that displays a list of all listing categories. Clicking on the name of any category should take the user to a page that displays all of the active listings in that category.

Django Admin Interface: Via the Django admin interface, a site administrator should be able to view, add, edit, and delete any listings, comments, and bids made on the site.