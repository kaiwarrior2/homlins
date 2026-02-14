const API_URL = 'http://localhost:5000/api';

async function saveTextToDatabase(character, text) {
    try {
        const response = await fetch(`${API_URL}/save-text`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ character, text })
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Ошибка сохранения:', error);
        return null;
    }
}

async function getAllTexts() {
    try {
        const response = await fetch(`${API_URL}/get-texts`);
        const result = await response.json();
        return result.texts;
    } catch (error) {
        console.error('Ошибка получения текстов:', error);
        return [];
    }
}

// Пример использования
async function submitText() {
    const character = document.getElementById('characterSelect').value;
    const text = document.getElementById('descriptionText').value;
    
    if (!character || !text) {
        alert('Заполните все поля!');
        return;
    }
    
    const result = await saveTextToDatabase(character, text);
    
    if (result && result.success) {
        alert('Текст успешно сохранен!');
    } else {
        alert('Ошибка сохранения текста');
    }
}
