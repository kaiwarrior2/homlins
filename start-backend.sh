#!/bin/bash

echo "========================================"
echo "  Запуск Backend для анализа текста"
echo "========================================"
echo ""

cd backend

if [ ! -d "venv" ]; then
    echo "Создание виртуального окружения..."
    python3 -m venv venv
    echo ""
fi

echo "Активация виртуального окружения..."
source venv/bin/activate

echo ""
echo "Установка зависимостей..."
pip install -r requirements.txt --quiet

echo ""
echo "========================================"
echo "  Backend запускается на http://localhost:5000"
echo "========================================"
echo ""

python app.py
