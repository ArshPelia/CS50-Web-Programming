# views.py
from django import forms
from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import HttpResponseRedirect
from . import util
import markdown2
import random



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
    markdown_content = util.get_entry(entry)
    if markdown_content is None:
        return render(request, "encyclopedia/error.html", {
            "message": "Entry not found"
        })

    html_content = markdown2.markdown(markdown_content)
    return render(request, "encyclopedia/entry.html", {
        "title": entry,
        "desc": html_content
    })

def search(request):
    if request.method == 'POST':
        text = request.POST['q']
        print('searching')
        if util.get_entry(text) is not None:
            return render(request, "encyclopedia/entry.html", {
                "title": text,
                "heading": 'All Pages',
                "desc": util.get_entry(text)
            })
        
        else:
            entries = util.list_entries()
            matches = [entry for entry in entries if text.lower() in entry.lower()]
            return render(request, "encyclopedia/index.html", {
                "title": 'Search',
                "heading": 'Search Results',
                "entries": matches,
            })

""" 
Inside this class, we can specify what information we would like to collect from the user, 
    in this case the name of a entry.

We specify that this should be a textual input by writing forms.CharField,

Within this CharField, we specify a label, which will appear to the user when they load the page.
"""

class NewEntryForm(forms.Form):
    entry = forms.CharField(label="New Entry")
    desc = forms.CharField(label="Description", widget=forms.Textarea(attrs={'height': '90vh', 'width': '20%'}))
    

""" 
Add a new entry:
    include NewEntryForm in the context while rendering the add page: 
"""

def add(request):
    # Check if method is POST

    if request.method == "POST":

        # Take in the data the user submitted and save it as form
        form = NewEntryForm(request.POST)

        # Check if form data is valid (server-side)
        if form.is_valid():

            # Isolate the entry from the 'cleaned' version of form data
            entry = form.cleaned_data["entry"]
            desc = form.cleaned_data["desc"]

            if util.get_entry(entry) is not None:
                raise forms.ValidationError('ERROR: Duplicate Entry.')

            # Add the new entry to our list of entrys
            util.save_entry(entry, desc)

            # Redirect user to list of entrys
            return HttpResponseRedirect(reverse("encyclopedia:add"))

        else:

            # If the form is invalid, re-render the page with existing information.
            return render(request, "encyclopedia/add.html", {
                "form": form
            })

    return render(request, "encyclopedia/add.html", {
        "form": NewEntryForm()
    })

class NewEditForm(forms.Form):
    entry = forms.CharField(label="Entry", disabled=True, required=False)
    desc = forms.CharField(label="Description", widget=forms.Textarea(attrs={'height': '90vh', 'width': '20%'}))

def edit(request, entry):
    existing_entry = util.get_entry(entry)
    if existing_entry is None:
        return render(request, "encyclopedia/error.html", {
            "message": "Entry not found"
        })

    if request.method == "POST":
        form = NewEditForm(request.POST)
        if form.is_valid():
            new_desc = form.cleaned_data["desc"]
            util.save_entry(entry, new_desc)
            return HttpResponseRedirect(reverse("encyclopedia:edit", args=[entry]))
    else:
        form = NewEditForm(initial={'entry': entry, 'desc': existing_entry})

    return render(request, "encyclopedia/edit.html", {
        "entry": entry,
        "form": form
    })

def randomPage(request):
    entry = random.choice(util.list_entries())
    return render(request, "encyclopedia/randomPage.html", {
        "entry":  entry
    })