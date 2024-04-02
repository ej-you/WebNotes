document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    let content = document.getElementById('editor').innerHTML;
    // Устанавливаем значение скрытого поля
    document.getElementById('content').value = content;
    // Отправляем форму
    this.submit();
});


function wrapText(button) {
    console.log(button.id);

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
    };
}
