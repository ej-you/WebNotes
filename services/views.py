from flask import request, render_template

from data.constants import HOST, app


@app.before_request
def check_auth_token():
    # получаем из запроса часть URL без протокола и домена/ip
    relative_url = request.url.removeprefix(HOST)
    print(relative_url)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/notes-list')
def notes_list():
    return render_template('notes_list.html')


@app.route('/note/<note_name>')
def note(note_name):
    print(note_name)
    return render_template('note.html')
