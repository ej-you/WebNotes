// Функция загрузки темы из localStorage
function loadTheme() {
    let theme = localStorage.getItem("theme") || "light";  // Если темы нет, по умолчанию "light"
    document.body.classList.add(theme + "-theme");  // Добавляем класс "light-theme" или "dark-theme"
}

// Функция переключения темы
function toggleTheme() {
    let currentTheme = document.body.classList.contains("dark-theme") ? "dark" : "light"; // Определяем текущую тему
    let newTheme = currentTheme === "light" ? "dark" : "light"; // Меняем её

    document.body.classList.remove(currentTheme + "-theme");  // Удаляем текущий класс
    document.body.classList.add(newTheme + "-theme");  // Добавляем новый класс

    localStorage.setItem("theme", newTheme);  // Сохраняем тему в localStorage
}

loadTheme(); // Загружаем тему при загрузке страницы
