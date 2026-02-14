from django.contrib import admin
from .models import UserText

@admin.register(UserText)
class UserTextAdmin(admin.ModelAdmin):
    list_display = ['character_name', 'created_at']
    list_filter = ['character_name', 'created_at']
    search_fields = ['character_name', 'text_content']
    readonly_fields = ['created_at']
