from rest_framework import serializers
from .models import UserText

class UserTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserText
        fields = ['id', 'character_name', 'text_content', 'created_at']
        read_only_fields = ['id', 'created_at']
