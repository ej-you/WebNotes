from re import sub as re_sub

from data.constants import FILES_ROOT


def txt_to_html(txt: str) -> str:
    # изменяем \n на <br>
    br_txt = re_sub('\\n', '<br>', txt)

    return txt


def get_file_content(note_name: str) -> str:
    # читаем содержимое файла
    with open(f'{FILES_ROOT}/{note_name}') as note_file:
        existing_text = note_file.read()

    # изменяем разметку markdown на разметку html
    processed_file = txt_to_html(txt=existing_text)

    return processed_file
