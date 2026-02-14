const API_BASE_URL = 'http://localhost:5000/api';

async function analyzeTextWithBackend(text, character) {
    try {
        const response = await fetch(`${API_BASE_URL}/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, character })
        });
        
        if (!response.ok) throw new Error('Backend error');
        return await response.json();
    } catch (error) {
        console.error('Backend Error:', error);
        return null;
    }
}

async function checkDescriptionWithAI() {
    const character = document.getElementById('characterSelect').value;
    const text = document.getElementById('descriptionText').value.trim();
    
    if (!character) {
        alert('Выберите персонажа!');
        return;
    }
    
    if (!text) {
        alert('Напишите текст!');
        return;
    }
    
    document.getElementById('loadingAI').style.display = 'block';
    document.getElementById('aiResult').style.display = 'none';
    
    const result = await analyzeTextWithBackend(text, character);
    
    if (result) {
        displayBackendResult(result);
    } else {
        const localAnalysis = analyzeTextLocally(text);
        displayAIResult(localAnalysis, null);
    }
    
    document.getElementById('loadingAI').style.display = 'none';
}

function analyzeTextLocally(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    
    const descriptiveWords = ['красивый', 'маленький', 'большой', 'добрый', 'мудрый', 
                             'веселый', 'яркий', 'тихий', 'старый', 'молодой', 
                             'милый', 'умный', 'смелый'];
    const hasDescriptive = descriptiveWords.some(word => text.toLowerCase().includes(word));
    
    let score = 0;
    let feedback = [];
    
    if (sentences.length >= 8) {
        score += 40;
        feedback.push('✓ Достаточное количество предложений (' + sentences.length + ')');
    } else if (sentences.length >= 1) {
        score += 20;
        feedback.push('⚠ Мало предложений (' + sentences.length + '). Рекомендуется: 8+');
    } else {
        feedback.push('❌ Нет предложений');
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
    } else if (words.length >= 1) {
        score += 15;
        feedback.push('⚠ Мало слов (' + words.length + '). Рекомендуется: 100+');
    } else {
        feedback.push('❌ Нет текста');
    }
    
    return { score, feedback };
}

function displayBackendResult(result) {
    const resultDiv = document.getElementById('aiResult');
    const score = result.score;
    let color = score >= 80 ? '#28a745' : (score >= 60 ? '#ffc107' : '#dc3545');
    let emoji = score >= 80 ? '✅' : (score >= 60 ? '⚠️' : '❌');
    
    let html = `
        <h4 style="color: ${color}; margin-bottom: 1rem;">${emoji} Оценка: ${score}/100</h4>
        <div style="text-align: left; line-height: 2;">
            <h5>📊 Структурный анализ:</h5>
            <ul>
                ${result.structure.feedback.map(f => '<li>' + f + '</li>').join('')}
            </ul>
            <h5>🤖 Нейросетевой анализ:</h5>
            <ul>
                <li>Качество текста: ${Math.round(result.neural.quality_score)}%</li>
                <li>Токсичность: ${Math.round(result.neural.toxicity_score)}%</li>
                <li>${result.neural.is_appropriate ? '✓ Текст соответствует нормам' : '⚠ Обнаружены проблемы'}</li>
            </ul>
        </div>
    `;
    
    resultDiv.innerHTML = html;
    resultDiv.style.display = 'block';
    resultDiv.style.background = color === '#28a745' ? '#d4edda' : (color === '#ffc107' ? '#fff3cd' : '#f8d7da');
    resultDiv.style.border = '2px solid ' + color;
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
