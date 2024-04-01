// отправка POST запроса на бэк
async function SendFetchRequestPost(url, jsonData) {
    // отправка запроса на бэк
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonData)
    });
    console.log('Response:', response);

    // чтение JSON ответа от flask
    response_json = await response.json();
    return response_json;
};


// при нажатии на кнопку save выполняем созранение введённого текста
function saveNote () {
    // записываем содержимое нашего редактора в переменную
    const note_content = document.getElementById('editor').innerHTML;
    // получаем имя заметки из пути URL
    const url_path = window.location.pathname;
    const note_name = url_path.split('/').pop();

    // API URL для отправки данных
    const save_note_api = 'http://127.0.0.1:5000/api/save_note';
    // ответ от flask
    api_response_json = SendFetchRequestPost(
        save_note_api,
        {
            "note_name": note_name,
            "note_content": note_content,
        }
    );
    console.log("Note saving:", api_response_json);

    // если возникла ошибка, то выводим юзеру окошко с ошибкой
    if (api_response_json.error) {
        alert(api_response_json.error);
    // если запрос прошёл успешно, то выводим модальное окно на 2 секунды
    } else {
        console.log('Successfully!');
    };
};
