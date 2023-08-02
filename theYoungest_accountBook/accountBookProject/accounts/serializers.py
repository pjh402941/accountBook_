from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create_user(
            id = validated_data['id'],
            birth = validated_data['birth'],
            phone = validated_data['phone'],
            nickname = validated_data['nickname'],
            name = validated_data['name'],
            password = validated_data['password']
        )
        return user
    class Meta:
        model = User
        fields = ['id', 'birth','nickname', 'phone', 'name', 'password']