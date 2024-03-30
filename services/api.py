from os import listdir, remove

from flask import request, jsonify

from data.constants import FILES_ROOT, app


@app.before_request
def check_remote_address():
    ...


@app.route('/api/create_note', methods=["POST"])
def create_note():
    # достаём имя для новой заметки
    body_json = request.json
    new_note_name = body_json.get("new_note_name")

    # если имя пустое, то возвращаем ошибку
    if not new_note_name:
        error_data = {"error": "Cannot create note! Note title is incorrect!"}
        return jsonify(error_data), 400
    # если заметка с таким именем уже существует, то возвращаем ошибку
    elif new_note_name in listdir(FILES_ROOT):
        error_data = {"error": "Cannot create note! Note with this title already exists!"}
        return jsonify(error_data), 409

    # создание пустого файла
    with open(f'{FILES_ROOT}/{new_note_name}', 'w'):
        pass

    new_note_data = {"new_note_name": new_note_name}
    return jsonify(new_note_data), 201


@app.route('/api/delete_note', methods=["POST"])
def delete_note():
    # достаём имя заметки для удаления
    body_json = request.json
    note_name = body_json.get("note_name")

    # если имя пустое, то возвращаем ошибку
    if not note_name:
        error_data = {"error": "Cannot delete note! Note title is incorrect!"}
        return jsonify(error_data), 400
        # если заметка с таким именем не найдена, то возвращаем ошибку
    elif note_name not in listdir(FILES_ROOT):
        error_data = {"error": "Cannot delete note! Note with this title does not exists!"}
        return jsonify(error_data), 409

    try:
        # удаление файла заметки
        remove(f'{FILES_ROOT}/{note_name}')
    except Exception as error:
        return jsonify({"error": error}), 500

    return jsonify({}), 200
