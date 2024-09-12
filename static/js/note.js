const editorElem = document.getElementById('editor');

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    let content = editorElem.innerHTML;
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

//            const editorFontSize = window.getComputedStyle(editorElem).fontSize
//
//            const spans = document.querySelectorAll('#editor span');
//            spans.forEach(span => {
//                span.style.fontSize = editorFontSize;
//            });

            break;
    };
}
