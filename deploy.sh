#!/bin/bash
# deploy.sh - Скрипт развёртывания приложения

set -e

echo "🚀 Начало развёртывания DevOps приложения..."

# Проверка Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен"
    exit 1
fi

echo "✅ Docker найден: $(docker --version)"

# Проверка Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose не установлен"
    exit 1
fi

echo "✅ Docker Compose найден: $(docker-compose --version)"

# Остановка старых контейнеров
echo "🛑 Остановка старых контейнеров..."
docker-compose down 2>/dev/null || true

# Построение образов
echo "🔨 Построение Docker образов..."
docker-compose build

# Запуск приложения
echo "▶️ Запуск приложения..."
docker-compose up -d

# Ожидание запуска сервисов
echo "⏳ Ожидание запуска сервисов..."
sleep 10

# Проверка здоровья
echo "🏥 Проверка здоровья приложения..."

if curl -f http://localhost:5000/health > /dev/null 2>&1; then
    echo "✅ Приложение здорово!"
else
    echo "❌ Приложение не здорово"
    docker-compose logs web
    exit 1
fi

# Вывод информации о сервисах
echo ""
echo "================================"
echo "✅ Развёртывание завершено!"
echo "================================"
echo ""
echo "📌 Доступные сервисы:"
echo "  🌐 Веб приложение:  http://localhost"
echo "  📊 Prometheus:      http://localhost:9090"
echo "  📈 Grafana:         http://localhost:3000 (admin/admin)"
echo "  📝 API Docs:        http://localhost/api"
echo ""
echo "🛑 Для остановки: docker-compose down"
echo "📋 Логи: docker-compose logs -f"
