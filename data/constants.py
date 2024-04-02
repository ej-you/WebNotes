import os
import logging
from datetime import timedelta
from dotenv import load_dotenv
from pathlib import Path

from flask import Flask


load_dotenv()


BASEDIR = Path(__file__).parent.parent

JWT_EXPIRE = timedelta(minutes=3)
SECRET_KEY = os.getenv('SECRET_KEY')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
PROTOCOl = "http://"

FILES_ROOT = f'{BASEDIR}/files'

app = Flask(__name__, template_folder=f"{BASEDIR}/templates", static_folder=f"{BASEDIR}/static")

logger = logging.getLogger('flask-server')
logging.basicConfig(
    level=logging.INFO,
    filename='logs/views_logs.log',
    format='%(levelname)s: (%(module)s, %(lineno)s) -- %(message)s',
)
