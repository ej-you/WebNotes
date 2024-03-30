// при нажатии на кнопку create выполняем создание новой заметки
async function createNote () {
    // API URL для отправки данных
    const create_note_api = 'http://127.0.0.1:5000/api/create_note';

    // запрос имени для новой заметки
    let new_note_name = prompt('Enter title for new note:');
    let data = {"new_note_name": new_note_name};

    // отправка данных на flask
    const response = await fetch(create_note_api, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    // чтение ответа от flask
    api_response = await response.json();
    console.log("Note creating:", api_response, response);

    // если возникла ошибка, то выводим юзеру окошко с ошибкой
    if (api_response.error) {
        alert(api_response.error);
    // если запрос прошёл успешно, то добавляем в список всех заметок только что созданную заметку
    } else {
        // получение div со всеми заметками
        let all_notes_div = document.getElementById("all-notes");
        console.log(all_notes_div);

        // создание элемента новой заметки и добавление нужных атрибутов
        let new_note_elem = document.createElement('div');
        new_note_elem.className = 'note';
        new_note_elem.innerHTML = `<a href="/note/${new_note_name}">${new_note_name}</a>
            <svg onclick="deleteNote(this)" id=${new_note_name} clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m22 6c0-.552-.448-1-1-1h-12.628c-.437 0-.853.191-1.138.523-1.078 1.256-3.811 4.439-4.993 5.815-.16.187-.241.419-.241.651 0 .231.08.463.24.651 1.181 1.38 3.915 4.575 4.994 5.835.285.333.701.525 1.14.525h12.626c.552 0 1-.448 1-1 0-2.577 0-9.423 0-12zm-13.628.5h12.128v11h-12.126l-4.715-5.51zm5.637 4.427 1.71-1.71c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.384-.219.531l-1.711 1.711 1.728 1.728c.147.147.22.339.22.53 0 .427-.349.751-.75.751-.192 0-.384-.073-.531-.219l-1.728-1.729-1.728 1.729c-.146.146-.339.219-.531.219-.401 0-.75-.324-.75-.751 0-.191.073-.383.22-.53l1.728-1.728-1.788-1.787c-.146-.148-.219-.339-.219-.532 0-.425.346-.749.751-.749.192 0 .384.073.53.219z" fill-rule="nonzero"/>
            </svg>`;

        console.log(new_note_elem)
        // добавление нового элемента заметки в div со всеми заметками
        all_notes_div.prepend(new_note_elem);
    };
};


async function deleteNote(svg) {
    const delete_shure = confirm("Are you shure you want to delete this note?");

    if (!delete_shure) {
        return
    };

    // API URL для отправки данных
    const delete_note_api = 'http://127.0.0.1:5000/api/delete_note';

    let data = {"note_name": svg.id};

    const response = await fetch(delete_note_api, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    // чтение ответа от flask
    api_response = await response.json();
    console.log("Note deleting:", api_response, response);

    // если возникла ошибка, то выводим юзеру окошко с ошибкой
    if (api_response.error) {
        alert(api_response.error);
    // если запрос прошёл успешно, то удаляем из списка всех заметок только что удалённую заметку
    } else {
        let note_div = svg.parentNode;
        note_div.remove();
    };
};
