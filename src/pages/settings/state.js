export default {
  name: 'Роман',
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
  ]
};
