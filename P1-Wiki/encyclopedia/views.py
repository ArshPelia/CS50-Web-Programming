from django.shortcuts import render

from . import util


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

# def css(request):
#     return render(request, "", {
#     })

# def django(request):
#     return render(request, "", {
#     })

# def git(request):
#     return render(request, "", {
#     })

# def html(request):
#     return render(request, "", {
#     })

# def python(request):
#     return render(request, "", {
#     })