from django.shortcuts import render

from . import util


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def open(request, name):
    return render(request, "entry/index.html", {
        "title": name,
        "desc": util.get_entry(name)
    })
