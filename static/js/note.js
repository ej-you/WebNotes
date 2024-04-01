document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    var content = document.getElementById('editor').innerHTML;
    // Устанавливаем значение скрытого поля
    document.getElementById('content').value = content;
    // Отправляем форму
    this.submit();
});
