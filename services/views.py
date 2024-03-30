from os import listdir

from flask import request, render_template, abort

from data.constants import FILES_ROOT, PROTOCOl, app
from .services import get_file_content


@app.before_request
def check_auth_token():
    # получаем из запроса часть URL без протокола и домена/ip
    relative_url = request.url.removeprefix(PROTOCOl + request.host)

    # для статики пропускаем обработку перед ответом на запрос
    if relative_url.startswith('/static'):
        return

    print(relative_url)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/all-notes')
def all_notes():
    # получаем список всех файлов
    notes = listdir(FILES_ROOT)
    return render_template(
        'all_notes.html',
        notes=notes
    )


@app.route('/note/<note_name>')
def note(note_name):
    # если имя файла не найдено в списке файлов, то возвращаем 404
    if note_name not in listdir(FILES_ROOT):
        abort(404)

    # достаём текст из файла
    existing_text = get_file_content(note_name=note_name)

    return render_template(
        'note.html',
        existing_text=existing_text,
    )
