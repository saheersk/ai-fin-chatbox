from django.urls import path

from api.v1.prompt.views import MessageView, CompanyView


urlpatterns = [
    path("", MessageView.as_view(), name="chatbox"),
    path("company/test/", CompanyView.as_view(), name="company"),
]