from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def fanfics(request):
    return render(request, 'fanfics.html')

def karl(request):
    return render(request, 'karl.html')

def leo(request):
    return render(request, 'leo.html')

def vitya(request):
    return render(request, 'vitya.html')
