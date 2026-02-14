# Инструкция по интеграции нейросети

## Что было создано

### 1. Backend (Python + Flask)
- `backend/app.py` - REST API сервер
- `backend/models/text_analyzer.py` - нейросетевая модель на PyTorch
- `backend/requirements.txt` - зависимости Python

### 2. Frontend
- `ai-checker-backend.js` - обновленный скрипт для работы с backend

## Как интегрировать

### Шаг 1: Обновите fanfics.html

Найдите строку:
```html
<script src="ai-checker.js"></script>
```

Замените на:
```html
<script src="ai-checker-backend.js"></script>
```

### Шаг 2: Запустите backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python app.py
```

### Шаг 3: Откройте сайт

Backend будет работать на http://localhost:5000
Frontend автоматически подключится к нему

## Преимущества новой системы

✅ **Нейросетевой анализ** - использует RuBERT для глубокого понимания текста
✅ **Определение токсичности** - автоматическая проверка на неприемлемый контент
✅ **Оценка качества** - нейросеть оценивает литературное качество текста
✅ **Fallback режим** - если backend недоступен, работает локальный анализ
✅ **Комбинированная оценка** - структурный + нейросетевой анализ

## Архитектура нейросети

```
Текст → Токенизация → RuBERT-tiny2 → [Голова качества] → Оценка качества
                                    → [Голова токсичности] → Оценка токсичности
```

## API Endpoints

### POST /api/analyze
Анализирует текст и возвращает оценку

**Request:**
```json
{
  "text": "Текст для анализа",
  "character": "Карл"
}
```

**Response:**
```json
{
  "score": 85,
  "structure": {
    "score": 80,
    "feedback": ["✓ Достаточное количество предложений (10)", ...]
  },
  "neural": {
    "quality_score": 90.5,
    "toxicity_score": 5.2,
    "is_appropriate": true
  },
  "character": "Карл"
}
```

### GET /api/health
Проверка работоспособности сервера

**Response:**
```json
{
  "status": "ok"
}
```

## Требования

- Python 3.8+
- 2GB RAM минимум
- Интернет для первой загрузки модели

## Troubleshooting

**Проблема:** Backend не запускается
**Решение:** Проверьте, что установлены все зависимости и активировано виртуальное окружение

**Проблема:** CORS ошибка
**Решение:** Убедитесь, что flask-cors установлен и backend запущен

**Проблема:** Медленная работа
**Решение:** Первый запрос может быть медленным (загрузка модели), последующие будут быстрее
