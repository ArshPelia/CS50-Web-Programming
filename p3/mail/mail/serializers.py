from rest_framework import serializers
from .models import *


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = '__all__'  # Include all fields from the Email model
