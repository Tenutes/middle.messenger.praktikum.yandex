# Ya.Chat
### Установка
Версия Node: 12.18.2
Использовался yarn, поэтому:

```node.js
yarn // устанавливаем зависимости
yarn dev // запускаем watch и сервер
yarn build // билдим проект
yarn start // запускаем express
yarn lint // Проверяем ошибки
yarn types // Проверяем через Typesript
yarn jest // Запускаем тесты (в процессе)
yarn prepare // Инициализируем precommit-hook на eslint
```
Нужен npm? No problem - изайте вместо `yarn` => `npm install`. `yarn ...` => `npm run ...`

### Страницы

```
/ - Логин
/register - Регистрация
/500 - 500
/любая_абракадабра - 404
/settings - профиль/настройки
/settings/update - редактировать настройки
/settings/change-password - сменить пароль
```

### Плагины
В проекте подключены следующие плагины:
- ESLint - проверка качества кода
- Prettier - слежение за стилем кода, подробнее [тут](./CODESTYLE.md)

Так же код проходит транспиляцию через babel для поддержки различных технологий `es18`, `es16`

### Ссылки
[figma](https://www.figma.com/file/mkZSo0ewVa2xP0tSr0Z0YL/YaChat?node-id=0%3A1)
____
[репозиторий, ветка sprint_1](https://github.com/Tenutes/middle.messenger.praktikum.yandex/tree/sprint_1)

[репозиторий, ветка sprint_2](https://github.com/Tenutes/middle.messenger.praktikum.yandex/tree/sprint_2)
____
[pull request sprint_1](https://github.com/Tenutes/middle.messenger.praktikum.yandex/pull/1)

[pull request sprint_2](https://github.com/Tenutes/middle.messenger.praktikum.yandex/pull/2)

[pull request sprint_3](https://github.com/Tenutes/middle.messenger.praktikum.yandex/pull/3)
____
[сайт в netlify](https://kind-saha-49adaf.netlify.app/)
