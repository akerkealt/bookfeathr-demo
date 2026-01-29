// --- 1. Элементы управления ---
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
const burger = document.querySelector('.burger');
const closeSidebarBtn = document.querySelector('.close-btn');

const loginOverlay = document.getElementById('loginOverlay');
const settingsOverlay = document.getElementById('settingsOverlay');

// --- 2. Функции сайдбара ---
function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('show');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}

// Слушатели для сайдбара
burger?.addEventListener('click', openSidebar);
closeSidebarBtn?.addEventListener('click', closeSidebar);
overlay?.addEventListener('click', () => {
  closeSidebar();
  closeLogin(); // Закрываем окна при клике на фон, если нужно
});

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        const action = item.dataset.action;

        // 1. Сначала закрываем сайдбар в любом случае
        closeSidebar(); 

        // 2. Выполняем действие
        if (action === 'login') {
            document.getElementById('loginOverlay').style.display = 'flex';
        } else if (action === 'library') {
            window.location.href = 'library.html';
        } else if (action === 'music') {
            window.location.href = 'music.html';
        } else if (action === 'settings') {
            document.getElementById('settingsOverlay').style.display = 'flex';
        }
    });
});

// Функция для закрытия сайдбара
function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay'); // фон именно сайдбара
    
    sidebar.classList.remove('open'); // или как у тебя реализовано скрытие
    if(overlay) overlay.style.display = 'none';
}
    switch(action) {
      case 'library':
        window.location.href = 'library.html';
        break;
      case 'music':
        window.location.href = 'music.html';
        break;
      case 'login':
        openLogin();
        break;
      case 'settings':
        openSettings();
        break;
    }

// --- 4. Управление окнами (Login / Settings) ---
function openLogin() {
  loginOverlay.style.display = 'flex';
}

function closeLogin() {
  loginOverlay.style.display = 'none';
}

function openSettings() {
  settingsOverlay.style.display = 'flex';
}

function closeSettings() {
  settingsOverlay.style.display = 'none';
}

// Привязка кнопок закрытия внутри модалок
document.getElementById('closeLogin')?.addEventListener('click', closeLogin);
document.getElementById('closeSettings')?.addEventListener('click', closeSettings);

// --- 5. Переключение тем (настройки) ---
// Добавь в настройки кнопки с data-theme="dark", "read" и т.д.
document.querySelectorAll('[data-theme]').forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    // Удаляем все темы и ставим нужную
    document.body.classList.remove('light', 'dark', 'read', 'cold');
    document.body.classList.add(theme);
    
    // Сохраняем выбор в браузере
    localStorage.setItem('bookfeather-theme', theme);
  });
});

// Загрузка сохраненной темы при старте
const savedTheme = localStorage.getItem('bookfeather-theme');
if (savedTheme) {
  document.body.classList.add(savedTheme);
}