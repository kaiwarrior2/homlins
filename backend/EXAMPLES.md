# Примеры использования API

## Пример 1: Базовый анализ текста

### Запрос
```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Карл - это маленький и добрый хомлин. Он живет в Калининграде и любит помогать людям изучать русский язык. Карл очень умный и веселый персонаж.",
    "character": "Карл"
  }'
```

### Ответ
```json
{
  "score": 75,
  "structure": {
    "score": 65,
    "feedback": [
      "⚠ Мало предложений (3). Рекомендуется: 8+",
      "✓ Использованы описательные прилагательные",
      "⚠ Мало слов (25). Рекомендуется: 100+"
    ]
  },
  "neural": {
    "quality_score": 85.3,
    "toxicity_score": 2.1,
    "is_appropriate": true
  },
  "character": "Карл"
}
```

## Пример 2: Проверка здоровья сервера

### Запрос
```bash
curl http://localhost:5000/api/health
```

### Ответ
```json
{
  "status": "ok"
}
```

## Пример 3: Использование в JavaScript

```javascript
async function analyzeText() {
    const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: 'Ваш текст здесь',
            character: 'Карл'
        })
    });
    
    const result = await response.json();
    console.log('Оценка:', result.score);
    console.log('Качество:', result.neural.quality_score);
    console.log('Токсичность:', result.neural.toxicity_score);
}
```

## Пример 4: Использование в Python

```python
import requests

def analyze_text(text, character):
    url = 'http://localhost:5000/api/analyze'
    data = {
        'text': text,
        'character': character
    }
    
    response = requests.post(url, json=data)
    result = response.json()
    
    print(f"Оценка: {result['score']}")
    print(f"Качество: {result['neural']['quality_score']}")
    print(f"Токсичность: {result['neural']['toxicity_score']}")
    
    return result

# Использование
text = "Карл - добрый и умный хомлин..."
result = analyze_text(text, "Карл")
```

## Интерпретация результатов

### Оценка качества (quality_score)
- **90-100**: Отличный текст, хорошо структурирован
- **70-89**: Хороший текст, есть что улучшить
- **50-69**: Средний текст, нужны доработки
- **0-49**: Слабый текст, требует переработки

### Оценка токсичности (toxicity_score)
- **0-20**: Чистый текст
- **20-40**: Незначительная токсичность
- **40-60**: Умеренная токсичность
- **60-100**: Высокая токсичность

### Итоговая оценка (score)
Комбинация структурного и нейросетевого анализа:
- **80-100**: ✅ Отлично
- **60-79**: ⚠️ Хорошо
- **0-59**: ❌ Требует улучшения
