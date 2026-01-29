const songList = document.getElementById('songList');
const nameInput = document.getElementById('songName');
const linkInput = document.getElementById('songLink');

// Загрузка темы при старте
const savedTheme = localStorage.getItem("bookfeather_settings");
if (savedTheme) {
    document.body.className = JSON.parse(savedTheme).theme;
}

// Функция загрузки списка
function loadSongs() {
    const songs = JSON.parse(localStorage.getItem('my_music')) || [];
    songList.innerHTML = '';

    songs.forEach((song, index) => {
        const card = document.createElement('div');
        card.className = 'song-card';
        card.innerHTML = `
            <div class="song-header">
                <span class="song-title">♫ ${song.name}</span>
                <button class="remove-btn" onclick="removeSong(${index})">✕</button>
            </div>
            <audio controls src="${song.link}"></audio>
        `;
        songList.appendChild(card);
    });
}

// Добавление новой песни
function addSong() {
    const name = nameInput.value.trim();
    const link = linkInput.value.trim();

    if (!name || !link) {
        alert("Введите название и ссылку на файл!");
        return;
    }

    const songs = JSON.parse(localStorage.getItem('my_music')) || [];
    songs.push({ name, link });
    localStorage.setItem('my_music', JSON.stringify(songs));

    // Очистка полей и обновление списка
    nameInput.value = '';
    linkInput.value = '';
    loadSongs();
}

// Удаление песни
function removeSong(index) {
    const songs = JSON.parse(localStorage.getItem('my_music'));
    songs.splice(index, 1);
    localStorage.setItem('my_music', JSON.stringify(songs));
    loadSongs();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', loadSongs);