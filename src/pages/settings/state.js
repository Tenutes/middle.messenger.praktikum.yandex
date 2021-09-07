"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state = {
    name: 'Роман',
    update: {
        fields: [
            {
                id: 'email',
                name: 'email',
                type: 'email',
                label: 'Почта',
                value: 'mironov19960212@yandex.ru',
                required: true,
            },
            {
                id: 'login',
                name: 'login',
                type: 'text',
                label: 'Логин',
                value: 'mironov19960212',
                required: true,
            },
            {
                id: 'first_name',
                name: 'first_name',
                type: 'text',
                label: 'Имя',
                value: 'Роман',
                required: true,
            },
            {
                id: 'second_name',
                name: 'second_name',
                type: 'text',
                label: 'Фамилия',
                value: 'Миронов',
                required: true,
            },
            {
                id: 'nickname',
                name: 'nickname',
                type: 'text',
                label: 'Имя в чате',
                value: 'Tenutes',
                required: true,
            },
            {
                id: 'phone',
                name: 'phone',
                type: 'tel',
                label: 'Телефон',
                value: '+7 (925) 562-16-59',
                required: true,
            },
        ],
    },
    changePassword: {
        fields: [
            {
                id: 'password',
                name: 'password',
                type: 'password',
                label: 'Старый пароль',
                placeholder: 'Введите',
                required: true,
            },
            {
                id: 'password_new',
                name: 'password_new',
                type: 'password',
                label: 'Новый пароль',
                placeholder: 'Введите',
                required: true,
            },
            {
                id: 'password_new_repeat',
                name: 'password_new_repeat',
                type: 'password',
                label: 'Повторите пароль',
                placeholder: 'Введите',
                required: true,
            },
        ],
    },
};
exports.default = state;
