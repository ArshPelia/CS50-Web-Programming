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

# TODO: Project 4

Profile Page: 
    Clicking on a username should load that user’s profile page. This page should:
    Display the number of followers the user has, as well as the number of people that the user follows.
    Display all of the posts for that user, in reverse chronological order.
    For any other user who is signed in, this page should also display a “Follow” or “Unfollow” button that will let the current user toggle whether or not they are following this user’s posts. Note that this only applies to any “other” user: a user should not be able to follow themselves.

Following: 
    The “Following” link in the navigation bar should take the user to a page where they see all posts made by users that the current user follows.
    This page should behave just as the “All Posts” page does, just with a more limited set of posts.
    This page should only be available to users who are signed in.

Pagination: 
    On any page that displays posts, posts should only be displayed 10 on a page. If there are more than ten posts, a “Next” button should appear to take the user to the next page of posts (which should be older than the current page of posts). If not on the first page, a “Previous” button should appear to take the user to the previous page of posts as well.
    See the Hints section for some suggestions on how to implement this.

Edit Post: 
    Users should be able to click an “Edit” button or link on any of their own posts to edit that post.
    When a user clicks “Edit” for one of their own posts, the content of their post should be replaced with a textarea where the user can edit the content of their post.
    The user should then be able to “Save” the edited post. Using JavaScript, you should be able to achieve this without requiring a reload of the entire page.
    For security, ensure that your application is designed such that it is not possible for a user, via any route, to edit another user’s posts.

“Like” and “Unlike”: 
    Users should be able to click a button or link on any post to toggle whether or not they “like” that post.
    Using JavaScript, you should asynchronously let the server know to update the like count (as via a call to fetch) and then update the post’s like count displayed on the page, without requiring a reload of the entire page.

