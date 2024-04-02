from os import listdir, remove

from flask import abort, render_template, request, make_response

from data.constants import FILES_ROOT, PROTOCOl, SECRET_KEY, app
from .services import (get_file_content, save_new_content,
                       create_token, check_token_expired)


@app.before_request
def check_auth_token():
    # получаем из запроса часть URL без протокола и домена/ip
    relative_url = request.url.removeprefix(PROTOCOl + request.host)

    # для статики пропускаем обработку перед ответом на запрос
    if relative_url.startswith('/static'):
        return

    # достаём из куков токен авторизации юзера
    auth_cookie = request.cookies.get('Authorization')

    # если для ресурса требуется авторизация
    if relative_url != '/':
        # если юзер не авторизован, перекидываем его для авторизации на главную
        if not auth_cookie:
            return render_template("index.html")

        # проверка токена на то, истёк ли он или нет
        if check_token_expired(token=auth_cookie):
            # создаём ответ с главной страницей
            response = make_response(render_template("index.html"))

            # удаляем из куки токен авторизации юзера
            response.set_cookie('Authorization', max_age=0)
            return response

    # если юзер уже авторизирован, но просится на ресурс входа
    elif auth_cookie and relative_url == '/':
        # получаем список всех файлов
        notes = listdir(FILES_ROOT)
        return render_template(
            "all_notes.html",
            notes=notes,
        )


def index():
    # запрашивается вход в аккаунт
    if request.method == "POST":
        # достаём из формы секретный ключ
        secret_key = request.form['secret_key']

        if secret_key == SECRET_KEY:
            # получаем список всех файлов
            notes = listdir(FILES_ROOT)
            # создаём ответ и добавляем в куки токен авторизации
            response = make_response(render_template(
                "all_notes.html",
                notes=notes,
            ))
            response.set_cookie('Authorization', f'{create_token()}')
            return response

        else:
            return render_template('index.html', error="Invalid secret key!")

    return render_template('index.html')


def all_notes():
    # получаем список всех файлов
    notes = listdir(FILES_ROOT)
    return render_template(
        'all_notes.html',
        notes=notes,
    )


def note(note_name):
    # если имя файла не найдено в списке файлов, то возвращаем 404
    if note_name not in listdir(FILES_ROOT):
        abort(404)

    # запрашивается создание новой заметки
    if request.method == "POST":
        # достаём из формы содержимое заметки
        note_content = request.form['content']

        # сохранение нового контента заметки
        result = save_new_content(note_name=note_name, note_content=note_content)

        # если возникла ошибка при сохранении контента заметки
        if result != 'successfully':
            # достаём текст из файла
            existing_text = get_file_content(note_name=note_name)
            return render_template(
                'note.html',
                existing_text=existing_text,
                note_name=note_name,
                error=result,
            )

    # достаём текст из файла
    existing_text = get_file_content(note_name=note_name)
    # рендерим страничку заметки для её редактирования
    return render_template(
        'note.html',
        existing_text=existing_text,
        note_name=note_name,
    )


def create_note():
    if request.method == "GET":
        return render_template("post/create_note.html")

    # запрашивается создание новой заметки
    elif request.method == "POST":
        # достаём из формы имя для новой заметки
        new_note_name = request.form['new_note_name']

        # ДОБАВИТЬ ПРОВЕРКУ НА ВАЛИДНОЕ ИМЯ ЗАМЕТКИ (ФАЙЛА)

        # если заметка с таким именем уже существует, то возвращаем ошибку
        if new_note_name in listdir(FILES_ROOT):
            error = "Cannot create note! Note with this title already exists!"
            return render_template("post/create_note.html", error=error)

        # создание пустого файла
        with open(f'{FILES_ROOT}/{new_note_name}', 'w'):
            pass

        # получаем список всех файлов
        notes = listdir(FILES_ROOT)
        # перекидываем юзера на страницу со всеми заметками
        return render_template("all_notes.html", notes=notes, status="created")


def delete_note(note_name):
    # если имя файла не найдено в списке файлов, то возвращаем 404
    if note_name not in listdir(FILES_ROOT):
        abort(404)

    if request.method == "GET":
        return render_template("post/delete_note.html", note_name=note_name)

    # запрашивается удаление заметки
    elif request.method == "POST":
        # достаём из формы имя для новой заметки
        note_name = request.form['note_name']

        # если заметка с таким именем не найдена, то возвращаем ошибку
        if note_name not in listdir(FILES_ROOT):
            error = "Cannot delete note! Note with this title does not exists!"
            return render_template("post/delete_note.html", error=error)

        try:
            # удаление файла заметки
            remove(f'{FILES_ROOT}/{note_name}')
        except Exception as error:
            return render_template("post/delete_note.html", error=error)

        # получаем список всех файлов
        notes = listdir(FILES_ROOT)
        # перекидываем юзера на страницу со всеми заметками
        return render_template("all_notes.html", notes=notes, status="deleted")


def logout():
    if request.method == "GET":
        return render_template("post/logout.html")

    # запрашивается выход из аккаунта
    elif request.method == "POST":
        # создаём ответ и удаляем куки авторизации
        response = make_response(render_template("index.html"))
        response.set_cookie('Authorization', max_age=0)
        return response
