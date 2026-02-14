const API_URL = 'http://localhost:8000/api';

async function saveText(character, text) {
    try {
        const response = await fetch(`${API_URL}/texts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                character_name: character,
                text_content: text
            })
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
        const response = await fetch(`${API_URL}/texts/`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Ошибка получения текстов:', error);
        return [];
    }
}

async function submitText() {
    const character = document.getElementById('characterSelect').value;
    const text = document.getElementById('descriptionText').value;
    
    if (!character || !text) {
        alert('Заполните все поля!');
        return;
    }
    
    const result = await saveText(character, text);
    
    if (result && result.id) {
        alert('Текст успешно сохранен!');
    } else {
        alert('Ошибка сохранения текста');
    }
}
