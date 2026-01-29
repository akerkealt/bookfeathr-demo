// --- 1. ПЕРЕМЕННЫЕ ЭЛЕМЕНТОВ ---
const fontSizeInput = document.getElementById('fontSize');
const textPreview = document.getElementById('textPreview');
const themeSelect = document.getElementById('theme');
const languageSelect = document.getElementById('language');
const boldCheck = document.getElementById('bold');
const italicCheck = document.getElementById('italic');
const bgColorInput = document.getElementById('bgColor');
const bgUpload = document.getElementById('bgUpload');
const bgPreview = document.getElementById('bgPreview');

// --- 2. ЖИВОЕ ПРЕВЬЮ (Отражается сразу при изменении) ---

// Изменение размера шрифта
fontSizeInput.addEventListener('input', () => {
    const size = fontSizeInput.value + "px";
    textPreview.style.fontSize = size;
});

// Жирные / Курсив
boldCheck.addEventListener('change', () => {
    textPreview.style.fontWeight = boldCheck.checked ? "bold" : "normal";
});

italicCheck.addEventListener('change', () => {
    textPreview.style.fontStyle = italicCheck.checked ? "italic" : "normal";
});

// Цвет фона
bgColorInput.addEventListener('input', () => {
    bgPreview.style.backgroundColor = bgColorInput.value;
    bgPreview.style.backgroundImage = "none"; // Убираем картинку, если выбран цвет
});

// Загрузка картинки фона
bgUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const imageData = event.target.result;
        bgPreview.style.backgroundImage = `url("${imageData}")`;
        // Временно храним в сессии для превью
        sessionStorage.setItem("tempBg", imageData);
    };
    reader.readAsDataURL(file);
});

// --- 3. СОХРАНЕНИЕ И ЗАГРУЗКА ---

function saveSettings() {
    const settings = {
        language: languageSelect.value,
        theme: themeSelect.value,
        fontSize: fontSizeInput.value,
        bold: boldCheck.checked,
        italic: italicCheck.checked,
        bgColor: bgColorInput.value
    };

    // Сохраняем объект в localStorage
    localStorage.setItem("bookfeather_settings", JSON.stringify(settings));

    // Если была загружена картинка, сохраняем её отдельно (они бывают тяжелыми)
    const tempBg = sessionStorage.getItem("tempBg");
    if (tempBg) {
        localStorage.setItem("bgImage", tempBg);
    }

    // Сразу применяем тему к body, чтобы увидеть результат
    document.body.className = settings.theme;

    alert("Настройки успешно применены!");
}

function loadSettings() {
    const saved = localStorage.getItem("bookfeather_settings");
    const savedBg = localStorage.getItem("bgImage");

    if (saved) {
        const s = JSON.parse(saved);

        // Заполняем форму данными
        languageSelect.value = s.language;
        themeSelect.value = s.theme;
        fontSizeInput.value = s.fontSize;
        boldCheck.checked = s.bold;
        italicCheck.checked = s.italic;
        bgColorInput.value = s.bgColor;

        // Применяем стили к превью
        textPreview.style.fontSize = s.fontSize + "px";
        textPreview.style.fontWeight = s.bold ? "bold" : "normal";
        textPreview.style.fontStyle = s.italic ? "italic" : "normal";
        bgPreview.style.backgroundColor = s.bgColor;
        
        // Применяем тему к самой странице настроек
        document.body.className = s.theme;
    }

    if (savedBg) {
        bgPreview.style.backgroundImage = `url("${savedBg}")`;
    }
}

// --- 4. ФУНКЦИИ АККАУНТА И ФАЙЛОВ ---

function removeAvatar() {
    if(confirm("Удалить аватар?")) {
        localStorage.removeItem("avatar");
        alert("Аватар удален");
    }
}

function removeBook() {
    localStorage.removeItem("currentBook");
    alert("Книга удалена из памяти");
}

function logout() {
    if(confirm("Вы действительно хотите выйти?")) {
        window.location.href = "index.html";
    }
}

function deleteAccount() {
    if(confirm("Удалить все данные? Это действие необратимо!")) {
        localStorage.clear();
        location.reload();
    }
}

// Запускаем загрузку при старте
window.addEventListener('DOMContentLoaded', loadSettings);