from django.shortcuts import render

from . import util

""" 
we pass a third argument into the render function here, one that is known as the context. 
    In this context, we can provide information that we would like to have available within 
    our HTML files. This context takes the form of a Python dictionary.

 """
def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def open(request, name):
    return render(request, "entry/index.html", {
        "title": name,
        "desc": util.get_entry(name)
    })
