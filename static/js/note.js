// при нажатии на кнопку save выполняем созранение введённого текста
function saveNote () {
    // записываем содержимое нашего редактора в переменную
    const content = document.getElementById('editor').innerHTML;
    console.log(content);
};


// при переноси строки добавляет <br><br>
document.addEventListener('keydown', function(event) {
    // Обрабатываем нажатие клавиши Enter
    if (event.key === 'Enter') {
        event.preventDefault(); /// Нежелательные div больше не образуются
        document.execCommand('insertHTML', false, '<br><br>');
    }
});
