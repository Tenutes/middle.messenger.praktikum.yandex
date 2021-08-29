export default {
  fields: [
    {
      id: 'email',
      type: 'email',
      name: 'email',
      required: true,
      label: 'Почта',
    },
    {
      id: 'login',
      type: 'text',
      name: 'login',
      required: true,
      label: 'Логин',
    },
    {
      id: 'first_name',
      type: 'text',
      name: 'first_name',
      required: true,
      label: 'Имя',
    },
    {
      id: 'second_name',
      type: 'text',
      name: 'second_name',
      required: true,
      label: 'Фамилия',
    },
    {
      id: 'phone',
      type: 'tel',
      name: 'phone',
      required: true,
      label: 'Телефон',
    },
    {
      id: 'password',
      type: 'password',
      name: 'password',
      required: true,
      label: 'Пароль',
    },
    {
      id: 'password_repeat',
      type: 'password',
      name: 'password_repeat',
      required: true,
      label: 'Пароль (еще раз)',
    },
  ],
};
