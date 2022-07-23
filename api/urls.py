from django.urls import path
from .views import GetRoom, RoomView , CreateRoomview

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomview.as_view()),
    path('get-room', GetRoom.as_view()),

]
