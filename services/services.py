import logging
import jwt

from datetime import datetime

from data.constants import FILES_ROOT, JWT_EXPIRE, JWT_SECRET_KEY


logger = logging.getLogger('flask-server')
logging.basicConfig(
    level=logging.INFO,
    filename='logs/views_logs.log',
    format='%(levelname)s: (%(module)s, %(lineno)s) -- %(message)s',
)


def get_file_content(note_name: str) -> str:
    # читаем содержимое файла
    with open(f'{FILES_ROOT}/{note_name}') as note_file:
        existing_text = note_file.read()

    return existing_text


def save_new_content(note_name: str, note_content: str) -> str:
    try:
        # читаем содержимое файла
        with open(f'{FILES_ROOT}/{note_name}', 'w') as note_file:
            note_file.write(note_content)
        return 'successfully'

    except Exception as error:
        return str(error)


def create_token() -> str:
    """Generate JWT-token expire in JWT_EXPIRE time"""

    token_create_time = datetime.now()
    token_expire_time = token_create_time + JWT_EXPIRE
    token = jwt.encode(
        {
            'exp': int(token_expire_time.strftime('%s'))
        },
        JWT_SECRET_KEY,
        algorithm='HS256'
    )
    return token


def check_token_expired(token: str) -> bool:
    """Проверка, истёк ли токен"""

    try:
        # декодируем токен
        jwt.decode(jwt=token, key=JWT_SECRET_KEY, algorithms='HS256')
        return False
    except jwt.exceptions.ExpiredSignatureError:
        return True
