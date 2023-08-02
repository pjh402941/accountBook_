from rest_framework.serializers import ModelSerializer, ReadOnlyField
from .models import AccountBook, Type1, Type2, Type3
from rest_framework import serializers

class BookSerializer(ModelSerializer):
    writer = ReadOnlyField(source='writer.username')
    
    class Meta:
        model = AccountBook
        fields = '__all__'
        read_only_fields = ['id', 'total']


class Type1_Serializer(ModelSerializer):
    writer = ReadOnlyField(source='writer.username')
    accountBook = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = Type1
        fields = '__all__'
        read_only_fields = ('id', )

class Type2_Serializer(ModelSerializer):
    writer = ReadOnlyField(source='writer.username')
    
    class Meta:
        model = Type2
        fields = '__all__'
        read_only_fields = ('id', 'accountBook',)

class Type3_Serializer(ModelSerializer):
    writer = ReadOnlyField(source='writer.username')
    
    class Meta:
        model = Type3
        fields = '__all__'
        read_only_fields = ('id', 'accountBook',)
