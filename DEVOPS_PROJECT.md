# DevOps Project - Полный стек приложения

> Готовый DevOps проект с Docker, CI/CD, мониторингом и базой данных

## 🚀 Что это?

Это полнофункциональное приложение **Task Manager** с полным DevOps стеком:

- **Приложение:** Flask веб-приложение с REST API
- **БД:** PostgreSQL для хранения данных
- **Кэш:** Redis для оптимизации
- **Мониторинг:** Prometheus + Grafana
- **Веб-сервер:** Nginx как reverse proxy
- **CI/CD:** GitHub Actions для автоматизации
- **Контейнеризация:** Docker и Docker Compose

## 📦 Архитектура

```
┌─────────────────────────────────────┐
│         Browser / Client            │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│        Nginx (80, 443)              │
│      (Reverse Proxy)                │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│   Flask App (5000)                  │
│   - REST API                        │
│   - Web Interface                   │
└────────────┬────────────────────────┘
             │
      ┌──────┴──────┬──────────┐
      │             │          │
   ┌──▼──┐      ┌──▼──┐   ┌──▼──┐
   │ DB  │      │Redis│   │Prom │
   └─────┘      └─────┘   └─────┘
                              │
                          ┌───▼───┐
                          │Grafana│
                          └───────┘
```

## 🎯 Быстрый старт

### 1. Клонировать репозиторий
```bash
git clone https://github.com/dereevvadim18-oss/DEVOPS-portfolio.git
cd DEVOPS-portfolio
```

### 2. Запустить приложение
```bash
# С помощью deploy скрипта
chmod +x deploy.sh
./deploy.sh

# Или вручную
docker-compose up -d
```

### 3. Открыть в браузере
```
🌐 Приложение:    http://localhost
📊 Prometheus:    http://localhost:9090
📈 Grafana:       http://localhost:3000 (admin/admin)
```

## 📁 Структура проекта

```
.
├── docker-compose.yml       # Оркестрация всех сервисов
├── prometheus.yml           # Конфигурация Prometheus
├── nginx.conf              # Конфигурация Nginx
├── deploy.sh               # Скрипт развёртывания
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions CI/CD
└── app/
    ├── Dockerfile          # Образ приложения
    ├── app.py              # Flask приложение
    ├── requirements.txt    # Python зависимости
    └── templates/
        └── index.html      # Веб интерфейс
```

## 🔧 Команды

### Запуск
```bash
docker-compose up -d
```

### Остановка
```bash
docker-compose down
```

### Логи
```bash
docker-compose logs -f web
docker-compose logs -f db
```

### Вход в контейнер
```bash
docker-compose exec web bash
docker-compose exec db psql -U devops -d devops_db
```

### Rebuild
```bash
docker-compose build --no-cache
docker-compose up -d
```

## 🌐 API Endpoints

### Задачи
```
GET    /api/tasks           # Получить все задачи
POST   /api/tasks           # Создать задачу
PUT    /api/tasks/{id}      # Обновить задачу
DELETE /api/tasks/{id}      # Удалить задачу
```

### Информация
```
GET    /health              # Проверка здоровья
GET    /api/stats           # Статистика
```

## 📊 Мониторинг

### Prometheus
- Адрес: http://localhost:9090
- Метрики приложения, системы, контейнеров

### Grafana
- Адрес: http://localhost:3000
- Логин: admin
- Пароль: admin
- Визуализация метрик Prometheus

### Node Exporter
- Порт: 9100
- Метрики системы (CPU, RAM, Disk)

## 🔐 Безопасность

- ✅ Health checks для всех сервисов
- ✅ Resource limits в docker-compose
- ✅ Изолированная сеть для сервисов
- ✅ Переменные окружения для чувствительных данных
- ✅ Nginx как barrier для веб приложения

## 📝 Переменные окружения

Создай `.env` файл:
```bash
POSTGRES_USER=devops
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=devops_db
FLASK_ENV=production
```

## 🚀 CI/CD Pipeline

GitHub Actions автоматически:
1. 🔨 Builds Docker image
2. ✅ Runs tests
3. 🔍 Scans with Trivy
4. 📦 Pushes to registry (опционально)
5. 🚀 Deploys to production

## 🛠️ Технологии

- **Backend:** Python, Flask, SQLAlchemy
- **Database:** PostgreSQL
- **Cache:** Redis
- **Containerization:** Docker, Docker Compose
- **Monitoring:** Prometheus, Grafana, Node Exporter
- **Web Server:** Nginx
- **CI/CD:** GitHub Actions
- **Frontend:** HTML, CSS, JavaScript

## 📚 Документация

- [Docker Compose docs](https://docs.docker.com/compose/)
- [Prometheus docs](https://prometheus.io/docs/)
- [Grafana docs](https://grafana.com/docs/)
- [Flask docs](https://flask.palletsprojects.com/)

## 💡 Примеры использования

### Добавить новую задачу
```bash
curl -X POST http://localhost/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Deploy to production",
    "description": "Release v1.0.0"
  }'
```

### Получить все задачи
```bash
curl http://localhost/api/tasks
```

### Обновить статус задачи
```bash
curl -X PUT http://localhost/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

## 📊 Производительность

- CPU: ~200m в режиме ожидания
- RAM: ~500Mb для всех сервисов
- Disk: ~2Gb для образов и данных

## 🎓 Образовательная ценность

Этот проект демонстрирует:
- ✅ Docker best practices
- ✅ Микросервисная архитектура
- ✅ Monitoring и alerting
- ✅ CI/CD автоматизация
- ✅ Infrastructure as Code
- ✅ Health checks и graceful shutdown
- ✅ Security considerations

## 🤝 Вклад

Улучшения приветствуются! Fork → Edit → Pull Request

## 📄 Лицензия

MIT License

---

**Автор:** Vadim Dereev  
**Email:** dereevvadim18@gmail.com  
**GitHub:** [dereevvadim18-oss](https://github.com/dereevvadim18-oss)

Made with ❤️ for DevOps engineers
