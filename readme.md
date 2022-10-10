# Первый самостоятельный пет-проект с использованием NodeJS

## Список бизнес логики для реализации

1. Система авторизации через АПИ - ✅
   - В basic-auth вместо пароля надо использовать токен из апи авторизации - ✅
2. Вывод информации о записях пользователей и самих пользователей из БД - ✅
   - Создание и чтение записей через АПИ - ✅
3. Система уровней доступа - ✅
4. Настройки в .env - ✅

## Настройка и запуск проекта

1. Запустить БД (реализовано только на PG)
2. Восстановить данные при помощи .dump файла БД
3. npm i 
4. nodemon app.ts или ts-node app.ts

### Для запуска тестов

1. npm run test [опционально путь до файла или маска]
