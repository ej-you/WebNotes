import os
from datetime import timedelta
from dotenv import load_dotenv
from pathlib import Path

from flask import Flask


load_dotenv()


BASEDIR = Path(__file__).parent.parent

JWT_EXPIRE = timedelta(minutes=1)
SECRET_KEY = os.getenv('SECRET_KEY')
HOST = "http://127.0.0.1:5000"

app = Flask(__name__, template_folder=f"{BASEDIR}/templates", static_folder=f"{BASEDIR}/static")
