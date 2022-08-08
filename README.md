# music_control

A  music collaboration web app that allows users in a virtual room to control music from a single spotify account.
It can be used in e.g. parties 
, It is made using React for the frontend and Django for the backend 
## Instructions on how to setup

### Install the  Required Python Modules

```bash
pip install -r requirements.txt
```
### Setup environment variables

Use the .env-sample files in the
Spotify and music_control directories and create a
.env file in the same directories.

Inorder to use Spotify API , create an app
on Spotify in the developer dashboard
, then fill in the SPOTIFY_CLIENT_KEY, 
SPOTIFY_CLIENT_ID , SPOTIFY_REDIRECT_URI 
from the app.

### Start Web Server

First cd into the music_ontrol project directory
```bash 
cd "music_ontrol"
```
Next run the django web server.
```bash
python manage.py runserver
```

### [Install Node.js](https://nodejs.org/en/)

### Install Node Modules

cd into the ```frontend``` folder.
```bash
cd frontend
```
Then install all dependicies.
```bash
npm i
```

### Compile the Front-End

Run the production compile script
```bash
npm run build
```
or for development:
```bash
npm run dev
```
