@echo off
echo ========================================
echo   Запуск Backend с MySQL
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
echo ========================================
echo   Backend запускается на http://localhost:5000
echo ========================================
echo.

python app.py
