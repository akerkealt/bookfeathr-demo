const chat = document.getElementById("chat");
const userInput = document.getElementById("userInput");

// Применяем тему
const saved = localStorage.getItem("bookfeather_settings");
if (saved) {
    document.body.className = JSON.parse(saved).theme;
}



function addMessage(text, sender){
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.textContent = text;
    chat.appendChild(div);
    
    // Плавная прокрутка вниз
    chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
}


async function sendMessage(){
    const text = userInput.value.trim();
    if(!text) return;

    addMessage(text, "user");
    userInput.value = "";

    // Показываем, что ИИ "думает"
    const typingDiv = document.createElement("div");
    typingDiv.className = "message ai";
    typingDiv.textContent = "...";
    chat.appendChild(typingDiv);

    try {
        // Здесь будет твой реальный запрос к API
        // Пока имитируем задержку и ответ
        setTimeout(() => {
            typingDiv.remove(); // Удаляем "..."
            addMessage("Ваш запрос принят! (Для работы реального ИИ нужно подключить API ключ в файле fai.js)", "ai");
        }, 1000);
        
        /* Код для реального API:
        const response = await fetch("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";", {
            method: "POST",
            body: JSON.stringify({ message: text })
        });
        const data = await response.json();
        typingDiv.remove();
        addMessage(data.reply, "ai");
        */
    } catch (e) {
        typingDiv.textContent = "Ошибка связи с сервером.";
    }
}