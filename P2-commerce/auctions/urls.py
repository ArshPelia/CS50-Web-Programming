from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create_listing", views.create_listing, name="create_listing"),
    path("open_listing/<int:listid>/", views.open_listing, name="open_listing"),
    path("close_listing/<int:listid>/", views.close_listing, name="close_listing"),
    path("place_bid/<int:listid>/", views.place_bid, name="place_bid"),
    path("addWatchlist/<int:listid>/", views.addWatchlist, name="addWatchlist"),
    path("rmWatchlist/<int:listid>/", views.rmWatchlist, name="rmWatchlist"),
    path("showWatchlist", views.showWatchlist, name="showWatchlist"),
    

]
