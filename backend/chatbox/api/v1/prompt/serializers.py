from rest_framework import serializers

class ChatSerializer(serializers.Serializer):
    user_input = serializers.CharField(max_length=200)