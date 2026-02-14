from django.contrib import admin
from django.urls import path, include
from . import pages_views

urlpatterns = [
    path('', pages_views.index, name='index'),
    path('fanfics/', pages_views.fanfics, name='fanfics'),
    path('karl/', pages_views.karl, name='karl'),
    path('leo/', pages_views.leo, name='leo'),
    path('vitya/', pages_views.vitya, name='vitya'),
    path('admin/', admin.site.urls),
    path('api/', include('homlins_project.texts.urls')),
]
