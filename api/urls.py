from django.urls import path
from .views import RoomView , CreateRoomview

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomview.as_view()),

]
