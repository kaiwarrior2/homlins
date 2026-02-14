// Для использования API создайте файл config.js с вашим токеном:
// const HF_TOKEN = 'your_token_here';
// const API_URL = 'https://api-inference.huggingface.co/models/cointegrated/rubert-tiny-toxicity';

async function analyzeTextWithAI(text) {
    if (typeof HF_TOKEN === 'undefined' || typeof API_URL === 'undefined') {
        return null;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${HF_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: text })
        });
        
        if (!response.ok) throw new Error('API error');
        return await response.json();
    } catch (error) {
        console.error('AI Error:', error);
        return null;
    }
}

async function checkDescriptionWithAI() {
    const character = document.getElementById('characterSelect').value;
    const text = document.getElementById('descriptionText').value.trim();
    const sentences = text ? text.split(/[.!?]+/).filter(s => s.trim().length > 0) : [];
    
    if (!character) {
        alert('Выберите персонажа!');
        return;
    }
    
    if (sentences.length < 8) {
        alert('Текст должен содержать минимум 8 предложений. Сейчас: ' + sentences.length);
        return;
    }
    
    document.getElementById('loadingAI').style.display = 'block';
    document.getElementById('aiResult').style.display = 'none';
    
    const aiResult = await analyzeTextWithAI(text);
    const localAnalysis = analyzeTextLocally(text);
    
    displayAIResult(localAnalysis, aiResult);
    document.getElementById('loadingAI').style.display = 'none';
}

function analyzeTextLocally(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    
    const descriptiveWords = ['красивый', 'маленький', 'большой', 'добрый', 'мудрый', 'веселый', 'яркий', 'тихий', 'старый', 'молодой', 'милый', 'умный', 'смелый'];
    const hasDescriptive = descriptiveWords.some(word => text.toLowerCase().includes(word));
    
    let score = 0;
    let feedback = [];
    
    if (sentences.length >= 8) {
        score += 40;
        feedback.push('✓ Достаточное количество предложений (' + sentences.length + ')');
    }
    
    if (hasDescriptive) {
        score += 30;
        feedback.push('✓ Использованы описательные прилагательные');
    } else {
        feedback.push('⚠ Добавьте больше описательных прилагательных');
    }
    
    if (words.length >= 100) {
        score += 30;
        feedback.push('✓ Достаточный объем текста (' + words.length + ' слов)');
    } else {
        feedback.push('⚠ Добавьте еще ' + (100 - words.length) + ' слов');
    }
    
    return { score, feedback };
}

function displayAIResult(analysis, aiData) {
    const resultDiv = document.getElementById('aiResult');
    let color = analysis.score >= 80 ? '#28a745' : (analysis.score >= 60 ? '#ffc107' : '#dc3545');
    let emoji = analysis.score >= 80 ? '✅' : (analysis.score >= 60 ? '⚠️' : '❌');
    
    resultDiv.innerHTML = `
        <h4 style="color: ${color}; margin-bottom: 1rem;">${emoji} Оценка: ${analysis.score}/100</h4>
        <ul style="text-align: left; line-height: 2;">
            ${analysis.feedback.map(f => '<li>' + f + '</li>').join('')}
        </ul>
    `;
    resultDiv.style.display = 'block';
    resultDiv.style.background = color === '#28a745' ? '#d4edda' : (color === '#ffc107' ? '#fff3cd' : '#f8d7da');
    resultDiv.style.border = '2px solid ' + color;
}
