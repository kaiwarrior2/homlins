# Нейросеть и Backend для анализа текста

## Установка и запуск

### Backend (Python)

1. Установите Python 3.8+
2. Перейдите в папку backend:
```bash
cd backend
```

3. Создайте виртуальное окружение:
```bash
python -m venv venv
```

4. Активируйте виртуальное окружение:
- Windows: `venv\Scripts\activate`
- Linux/Mac: `source venv/bin/activate`

5. Установите зависимости:
```bash
pip install -r requirements.txt
```

6. Запустите сервер:
```bash
python app.py
```

Сервер запустится на http://localhost:5000

### Frontend

1. Замените в HTML файле (fanfics.html) подключение скрипта:
```html
<!-- Старый вариант -->
<script src="ai-checker.js"></script>

<!-- Новый вариант с backend -->
<script src="ai-checker-backend.js"></script>
```

2. Откройте сайт в браузере

## Архитектура

### Нейросеть
- Основа: RuBERT-tiny2 (легковесная модель для русского языка)
- Две головы: качество текста и токсичность
- PyTorch + Transformers

### Backend
- Flask REST API
- Эндпоинты:
  - POST /api/analyze - анализ текста
  - GET /api/health - проверка работоспособности

### Frontend
- Автоматический fallback на локальный анализ при недоступности backend
- Отображение результатов нейросети и структурного анализа

## Возможности

✅ Анализ качества текста с помощью нейросети
✅ Определение токсичности
✅ Структурный анализ (предложения, слова, прилагательные)
✅ Комбинированная оценка
✅ Fallback на локальный анализ
