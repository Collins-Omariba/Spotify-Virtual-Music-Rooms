import environ

env = environ.Env()
environ.Env.read_env()

CLIENT_ID = env('SPOTIFY_CLIENT_ID')
CLIENT_SECRET = env('SPOTIFY_CLIENT_SECRET')
REDIRECT_URI = env('SPOTIFY_REDIRECT_URI')

# CLIENT_ID = "2750167bd83e47a99bbdeffdc2d942f0"
# CLIENT_SECRET = "7d2681cea08749ce9b21b939d53abfbd"
# REDIRECT_URI = "http://127.0.0.1:8000/spotify/redirect"