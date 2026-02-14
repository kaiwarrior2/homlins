# Django Backend для Хомлинов

## Установка и запуск

### Быстрый старт
```bash
start-django.bat
```

### Ручная установка

1. Создайте виртуальное окружение:
```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

2. Установите зависимости:
```bash
pip install -r requirements.txt
```

3. Примените миграции:
```bash
python manage.py makemigrations
python manage.py migrate
```

4. Создайте суперпользователя (опционально):
```bash
python manage.py createsuperuser
```

5. Запустите сервер:
```bash
python manage.py runserver
```

## API Endpoints

### GET /api/texts/
Получить все тексты

**Ответ:**
```json
[
  {
    "id": 1,
    "character_name": "Карл",
    "text_content": "Текст описания...",
    "created_at": "2024-01-01T12:00:00Z"
  }
]
```

### POST /api/texts/
Создать новый текст

**Запрос:**
```json
{
  "character_name": "Карл",
  "text_content": "Текст описания персонажа"
}
```

**Ответ:**
```json
{
  "id": 1,
  "character_name": "Карл",
  "text_content": "Текст описания персонажа",
  "created_at": "2024-01-01T12:00:00Z"
}
```

### GET /api/texts/{id}/
Получить конкретный текст

### PUT /api/texts/{id}/
Обновить текст

### DELETE /api/texts/{id}/
Удалить текст

### GET /api/health/
Проверка работоспособности

## Использование в HTML

Добавьте в HTML:
```html
<script src="django-api.js"></script>
```

Пример кнопки:
```html
<button onclick="submitText()">Сохранить текст</button>
```

## Админ-панель

Доступна по адресу: http://localhost:8000/admin/

Создайте суперпользователя:
```bash
python manage.py createsuperuser
```

## База данных

По умолчанию используется SQLite (db.sqlite3)

Для MySQL/PostgreSQL измените настройки в `homlins_project/settings.py`

## Структура проекта

```
backend/
├── manage.py
├── requirements.txt
└── homlins_project/
    ├── settings.py
    ├── urls.py
    └── texts/
        ├── models.py
        ├── views.py
        ├── serializers.py
        └── admin.py
```
