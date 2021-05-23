from django.db import models
from rest_framework import serializers
from accounts.models import Account


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type':'password'}, write_only=True)
    
    class Meta:
        model = Account
        fields = ['email', 'password','id','is_admin']
        extra_kwargs = {
            'password' : {'write_only':True}
        }
        
    def save(self):
        account = Account(
            email=self.validated_data['email'],
        )
        password=self.validated_data['password']
        account.set_password(password)
        account.save()
        return account