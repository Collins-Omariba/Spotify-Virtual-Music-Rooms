from django.urls import path
from .views import GetRoom, RoomView , CreateRoomview ,JoinRoom


urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomview.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view())

]
