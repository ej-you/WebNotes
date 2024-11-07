const editorElem = document.getElementById('editor');


document.addEventListener("keypress", (event) => {
    // сохранение заметки при комбинации клавиш Ctrl+Enter
    if (event.key == "Enter" && event.ctrlKey) {
        event.preventDefault();
        const saveButton = document.getElementById('saveButton');
        saveButton.click()
    }
});


document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    let content = editorElem.innerHTML;
    // Устанавливаем значение скрытого поля
    document.getElementById('content').value = content;
    // Отправляем форму
    this.submit();
});


function wrapText(button) {
    switch (button.id) {
        case ('b'):
            document.execCommand("bold");
            break;
        case ('i'):
            document.execCommand("italic");
            break;
        case ('undo'):
            document.execCommand("undo");
            break;
        case ('redo'):
            document.execCommand("redo");
            break;
        case ('clearFormat'):
            document.execCommand("backColor", false, "white");
            document.execCommand("foreColor", false, "black");

            // Если включен жирный текст на текущем выделении - отключаем
            if (document.queryCommandState("bold")) {
                document.execCommand("bold");
            }
            // Если включен курсив на текущем выделении - отключаем
            if (document.queryCommandState("italic")) {
                document.execCommand("italic");
            }

            // Удаление свойства font-size у всех span во избежание произвольного изменения размера текста редактора
            const spans = document.querySelectorAll('#editor span');
            spans.forEach(span => {
                span.style.removeProperty("font-size")
            });
            break;
    };
}
