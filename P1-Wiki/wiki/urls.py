"""wiki URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path


""" 
Process: When we access the URL (http://127.0.0.1:8000/) django checks what comes after the 
    base URL and searches this file for for that pattern. 

EX: if pattern = '' (base URL only) => path('', include("encyclopedia.urls")) then:
    Include all of the paths from the urls.py file within our application so
    when a user visits our site they’ll be redirected to the paths inside of our application.
"""

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("encyclopedia.urls")) 
]
