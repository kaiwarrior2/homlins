# База данных MySQL для сохранения текстов

## Установка

### 1. Установите MySQL
Скачайте и установите MySQL: https://dev.mysql.com/downloads/mysql/

### 2. Создайте базу данных
Запустите MySQL и выполните:
```bash
mysql -u root -p < backend/database/schema.sql
```

Или вручную в MySQL:
```sql
CREATE DATABASE homlins_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE homlins_db;
-- Скопируйте содержимое schema.sql
```

### 3. Настройте подключение
Отредактируйте `backend/database/db.py`:
```python
self.host = 'localhost'
self.user = 'root'
self.password = 'ваш_пароль'  # Укажите пароль MySQL
self.database = 'homlins_db'
```

### 4. Установите зависимости
```bash
cd backend
pip install -r requirements.txt
```

### 5. Запустите backend
```bash
python app.py
```

## API Endpoints

### POST /api/save-text
Сохраняет текст пользователя

**Запрос:**
```json
{
  "character": "Карл",
  "text": "Текст описания персонажа"
}
```

**Ответ:**
```json
{
  "success": true,
  "id": 1
}
```

### GET /api/get-texts
Получает все сохраненные тексты

**Ответ:**
```json
{
  "texts": [
    {
      "id": 1,
      "character_name": "Карл",
      "text_content": "Текст...",
      "created_at": "2024-01-01 12:00:00"
    }
  ]
}
```

## Использование в HTML

Добавьте в HTML:
```html
<script src="db-handler.js"></script>
```

Пример кнопки сохранения:
```html
<button onclick="submitText()">Сохранить текст</button>
```

## Структура БД

**Таблица: user_texts**
- `id` - уникальный идентификатор
- `character_name` - имя персонажа (Карл, Лео, Витя)
- `text_content` - текст описания
- `created_at` - дата создания
