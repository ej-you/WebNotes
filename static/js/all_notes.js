// переводим данные из вида FormData в вид JSON
function formDataToJSON(formData) {
    // выбираем список данных из формы
	let serializedData = Array.from(formData.entries());

	// делаем объект из полученных данных
	let jsonData = {};
	for (let i = 0; i < serializedData.length; i++) {
		let name = serializedData[i][0];
		let value = serializedData[i][1];
		jsonData[name] = value;
	}
    return jsonData;
};

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


// удаление заметки
async function deleteNote(svg) {
    const delete_shure = confirm("Are you shure you want to delete this note?");

    if (!delete_shure) {
        return;
    };

    // API URL для отправки данных
    const delete_note_api = 'http://127.0.0.1:5000/api/delete_note';
    // ответ от flask
    api_response_json = SendFetchRequestPost(delete_note_api, {"note_name": svg.id});
    console.log("Note deleting:", api_response_json);

    // если возникла ошибка, то выводим юзеру окошко с ошибкой
    if (api_response_json.error) {
        alert(api_response_json.error);
    // если запрос прошёл успешно, то удаляем из списка всех заметок только что удалённую заметку
    } else {
        let note_div = svg.parentNode;
        note_div.remove();
    };
};


// создание заметки
async function handleFormSubmitCreateNote(event) {
    // Просим форму не отправлять данные самостоятельно
    event.preventDefault();

    let form = event.target;
    // получаем данные с формы в JSON формате
    let jsonData = formDataToJSON(new FormData(form));

     // API URL для отправки данных
    const delete_note_api = 'http://127.0.0.1:5000/api/create_note';
    // ответ от flask
    api_response_json = SendFetchRequestPost(delete_note_api, jsonData);
    console.log("Note creating:", api_response_json);

    // делаем модальное окно невидимым
    const createModelBackground = document.getElementById("createModelBackground");
    createModelBackground.style.display = "none";

    // если возникла ошибка, то выводим юзеру окошко с ошибкой
    if (api_response_json.error) {
        alert(api_response_json.error);
    // если запрос прошёл успешно, то добавляем в список всех заметок только что созданную заметку
    } else {
        // получение div со всеми заметками
        let all_notes_div = document.getElementById("all-notes");

        // создание элемента новой заметки и добавление нужных атрибутов
        let new_note_name = jsonData.new_note_name;
        let new_note_elem = document.createElement('div');
        new_note_elem.className = 'note';
        new_note_elem.innerHTML = `<a href="/note/${new_note_name}">${new_note_name}</a>
            <svg onclick="deleteNote(this)" id=${new_note_name} clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m22 6c0-.552-.448-1-1-1h-12.628c-.437 0-.853.191-1.138.523-1.078 1.256-3.811 4.439-4.993 5.815-.16.187-.241.419-.241.651 0 .231.08.463.24.651 1.181 1.38 3.915 4.575 4.994 5.835.285.333.701.525 1.14.525h12.626c.552 0 1-.448 1-1 0-2.577 0-9.423 0-12zm-13.628.5h12.128v11h-12.126l-4.715-5.51zm5.637 4.427 1.71-1.71c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.384-.219.531l-1.711 1.711 1.728 1.728c.147.147.22.339.22.53 0 .427-.349.751-.75.751-.192 0-.384-.073-.531-.219l-1.728-1.729-1.728 1.729c-.146.146-.339.219-.531.219-.401 0-.75-.324-.75-.751 0-.191.073-.383.22-.53l1.728-1.728-1.788-1.787c-.146-.148-.219-.339-.219-.532 0-.425.346-.749.751-.749.192 0 .384.073.53.219z" fill-rule="nonzero"/>
            </svg>`;
        // добавление нового элемента заметки в div со всеми заметками
        all_notes_div.prepend(new_note_elem);
    };
};


// элементы управления модальным окном создания заметки
const modalTriggerCreate = document.getElementById("create");
const createModelClose = document.getElementById("createModelClose");
const createModelBackground = document.getElementById("createModelBackground");

// открытие модального окна создания заметки
modalTriggerCreate.addEventListener("click", function () {
    createModelBackground.style.display = "block";
    createModelBackground.getElementsByTagName("input")[0].focus();
});
// закрытие модального окна создания заметки при нажатии на крестик
createModelClose.addEventListener("click", function () {
    createModelBackground.style.display = "none";
});
// отправка формы создания заметки через js
const createModelForm = document.getElementById('createModelForm');
createModelForm.addEventListener('submit', handleFormSubmitCreateNote);
