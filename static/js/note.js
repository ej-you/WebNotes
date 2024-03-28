// при нажатии на кнопку save выполняем созранение введённого текста
function saveFunc () {
    // записываем содержимое нашего редактора в переменную
    const content = document.getElementById('editor').innerHTML;
    console.log(content);
};


function getSelectionText () {
    let text = "";
    // Не IE - используем метод getSelection (IE - используем объект selection [пока возвращаем ничего])
    if (text = window.getSelection) {
        text = window.getSelection().toString();
        console.log("window.getSelection()", window.getSelection());
    } else {
        // text = document.selection.createRange().text;
        return false;
    };

    return text;
};


function wrapTag(button) {
    console.log("button.id", button.id);
    console.log("getSelectionText()", [getSelectionText()]);
};
