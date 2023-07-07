from django.shortcuts import render

from . import util

""" 
we pass a third argument into the render function here, one that is known as the context. 
    In this context, we can provide information that we would like to have available within 
    our HTML files. This context takes the form of a Python dictionary.

 """
def index(request):
    return render(request, "encyclopedia/index.html", {
        "title": 'Search',
        "heading": 'All Pages',
        "entries": util.list_entries()
    })

def open(request, entry):
    return render(request, "encyclopedia/entry.html", {
        "title": entry,
        "desc": util.get_entry(entry)
    })


def search(request, text):
    if util.get_entry(text) is not None:
        return render(request, "encyclopedia/entry.html", {
            "title": text,
            "desc": util.get_entry(text)
        })
    
    else:
        entries = util.list_entries()
        matches = res = [i for i in entries if text in i]
        return render(request, "encyclopedia/index.html", {
            "title": 'Search',
            "heading": 'Search Results',
            "entries": matches,
        })
