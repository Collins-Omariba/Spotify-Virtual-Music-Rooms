from django.urls import path
from .views import GetRoom, LeaveRoom, RoomView , CreateRoomview ,JoinRoom, UpdateRoom,  UserInRoom


urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomview.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('update-room', UpdateRoom.as_view()),
]
