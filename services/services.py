from data.constants import FILES_ROOT


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

