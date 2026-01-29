// 1. Загрузка темы
const savedSettings = localStorage.getItem("bookfeather_settings");
if (savedSettings) document.body.className = JSON.parse(savedSettings).theme;

const bookList = document.getElementById('bookList');
const modal = document.getElementById('addBookModal');

// Массив книг (загружаем из памяти)
let myBooks = JSON.parse(localStorage.getItem('myLibrary')) || [];

function goHome() { window.location.href = "index.html"; }

function openAddBookModal() { modal.style.display = 'flex'; }
function closeAddBookModal() { modal.style.display = 'none'; }

// 2. Добавление книги
function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const coverInput = document.getElementById('bookCover');

    if (!title || !author) return alert("Заполните название и автора");

    const reader = new FileReader();
    
    // Если обложка выбрана, читаем её, если нет — используем пустую заглушку
    if (coverInput.files[0]) {
        reader.readAsDataURL(coverInput.files[0]);
        reader.onload = function() {
            saveAndRender(title, author, reader.result);
        };
    } else {
        saveAndRender(title, author, 'https://via.placeholder.com/150x200?text=No+Cover');
    }
}

function saveAndRender(title, author, cover) {
    const newBook = { title, author, cover, id: Date.now() };
    myBooks.push(newBook);
    localStorage.setItem('myLibrary', JSON.stringify(myBooks));
    
    renderBooks();
    closeAddBookModal();
    // Очистка полей
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
}

// 3. Отображение книг
function renderBooks() {
    bookList.innerHTML = '';
    myBooks.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <img src="${book.cover}" alt="Обложка">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <button onclick="removeBook(${book.id})" style="font-size:10px; color:red; border:none; background:none; cursor:pointer;">Удалить</button>
        `;
        bookList.appendChild(card);
    });
}

function removeBook(id) {
    myBooks = myBooks.filter(b => b.id !== id);
    localStorage.setItem('myLibrary', JSON.stringify(myBooks));
    renderBooks();
}

// 4. Генерация статистики (фейковая для примера)
function renderStats() {
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const statsContainer = document.getElementById('statsDays');
    
    days.forEach(day => {
        const height = Math.floor(Math.random() * 100) + 10; // Имитация страниц
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day-bar';
        dayDiv.innerHTML = `
            <div class="bar" style="height: ${height}px"></div>
            <span>${day}</span>
        `;
        statsContainer.appendChild(dayDiv);
    });
}

// Инициализация
renderBooks();
renderStats();