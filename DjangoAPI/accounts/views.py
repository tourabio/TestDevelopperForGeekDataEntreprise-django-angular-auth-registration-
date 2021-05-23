from django.shortcuts import render

from rest_framework.authentication import SessionAuthentication, BasicAuthentication,TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from rest_framework.decorators import api_view
from rest_framework import status
from accounts.serializers import RegistrationSerializer


class ProfileView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication,TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': str(request.user.email),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)




class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
        


@api_view(['POST', ])
def registration_view(request):
    if request.method =='POST':
        serializer = RegistrationSerializer(data = request.data)
        data={}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = "successfully registred a new user"
            data['email'] = account.email
        else :
            data = serializer.errors
        return Response(data)
            