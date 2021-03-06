from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf.urls import url 



from accounts import views 


urlpatterns = [
    path('profile/', views.ProfileView.as_view()),
    path('api/auth/', views.CustomAuthToken.as_view()),
    path('api/register/', views.registration_view, name="register"),
    url(r'^api/user/$',views.UserManagementApi),
    url(r'api/user/([0-9]+)$', views.UserManagementApi),
]
urlpatterns = format_suffix_patterns(urlpatterns)