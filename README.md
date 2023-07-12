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

# TODO: Project 3

Archive and Unarchive: Allow users to archive and unarchive emails that they have received.
    When viewing an Inbox email, the user should be presented with a button that lets them archive the email. When viewing an Archive email, the user should be presented with a button that lets them unarchive the email. This requirement does not apply to emails in the Sent mailbox.
    Recall that you can send a PUT request to /emails/<email_id> to mark an email as archived or unarchived.
    
    Once an email has been archived or unarchived, load the user’s inbox.
Reply: Allow users to reply to an email.
    When viewing an email, the user should be presented with a “Reply” button that lets them reply to the email.
    When the user clicks the “Reply” button, they should be taken to the email composition form.
    Pre-fill the composition form with the recipient field set to whoever sent the original email.
    Pre-fill the subject line. If the original email had a subject line of foo, the new subject line should be Re: foo. (If the subject line already begins with Re: , no need to add it again.)
    Pre-fill the body of the email with a line like "On Jan 1 2020, 12:00 AM foo@example.com wrote:" followed by the original text of the email.
    Hints