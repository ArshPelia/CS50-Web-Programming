from django.urls import path # give us the ability to reroute URLSs
from . import views # import any functions we’ve created in views.py.

""" 
    Used to associate views with URLS 

    For each desired URL, add an item to the urlpatterns list that contains a call to the
        path function with two or three arguments: 
        
        1. A string representing the URL path, 
        2. a function from views.py that we wish to call when that URL is visited
        3. (optionally) a name for that path, in the format name="something" 
        
"""

""" 
    After being re-routed from the main url.py (project scope); Django ignores 
        the parts of the URL it has already used in rerouting (localhost:8000/hello/, 
        or all of it) and looked inside our other urls.py file for a pattern that matches 
        the remaining part of the URL.

    Finally Django runs the corresponding function

"""

app_name = "encyclopedia"
urlpatterns = [ 
    # list of url patterns that a user might visit while using our website
    # if path = ""; run views.index
    path("", views.index, name="index"),
    path("<str:name>", views.open, name="open")

]
