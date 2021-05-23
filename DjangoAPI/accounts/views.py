from django.shortcuts import render

from rest_framework.authentication import SessionAuthentication, BasicAuthentication,TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from accounts.serializers import RegistrationSerializer
from accounts.models import Account


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
            'email': user.email,
            'is_admin': user.is_admin
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
    
    

        
        
@csrf_exempt
def UserManagementApi(request, id=0):
    if request.method =='GET':
        users = Account.objects.all()
        users_serializer = RegistrationSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)

    elif request.method =='PUT':
        user_data = JSONParser().parse(request)
        user = Account.objects.get(id = user_data['id'])
        user_serializer = RegistrationSerializer(user, data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Updated successfully!!", safe=False)
        return JsonResponse("Failed to update.", safe=False)

    elif request.method =='DELETE':
        user = Account.objects.get(id=id)
        user.delete()
        return JsonResponse("deleted successfully!!", safe=False)

