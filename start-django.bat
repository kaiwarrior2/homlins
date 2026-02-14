@echo off
echo ========================================
echo   Запуск Django Backend
echo ========================================
echo.

cd backend

if not exist venv (
    echo Создание виртуального окружения...
    python -m venv venv
    echo.
)

echo Активация виртуального окружения...
call venv\Scripts\activate

echo.
echo Установка зависимостей...
pip install -r requirements.txt --quiet

echo.
echo Применение миграций...
python manage.py makemigrations
python manage.py migrate

echo.
echo ========================================
echo   Django запускается на http://localhost:8000
echo   API: http://localhost:8000/api/
echo   Admin: http://localhost:8000/admin/
echo ========================================
echo.

python manage.py runserver
