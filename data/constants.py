import os
from datetime import timedelta
from dotenv import load_dotenv
from pathlib import Path

from flask import Flask


load_dotenv()


BASEDIR = Path(__file__).parent.parent

# JWT_EXPIRE = timedelta(minutes=3)
JWT_EXPIRE = timedelta(hours=1)
SECRET_KEY = os.getenv('SECRET_KEY')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
PROTOCOl = "http://"

FILES_ROOT = f'{BASEDIR}/files'

app = Flask(__name__, template_folder=f"{BASEDIR}/templates", static_folder=f"{BASEDIR}/static")
