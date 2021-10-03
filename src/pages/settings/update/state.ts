import { InputProps } from '../../../components/Input';

const fields: InputProps[] = [
  {
    id: 'email',
    name: 'email',
    type: 'email',
    label: 'Почта',
    value: 'mironov19960212@yandex.ru',
    placeholder: 'Введите',
    required: true,
    classes: 'text-sm text-gray border-0 w-1/2 text-right focus:text-blue-dark',
  },
  {
    id: 'login',
    name: 'login',
    type: 'text',
    label: 'Логин',
    value: 'mironov19960212',
    placeholder: 'Введите',
    required: true,
    classes: 'text-sm text-gray border-0 w-1/2 text-right focus:text-blue-dark',
  },
  {
    id: 'first_name',
    name: 'first_name',
    type: 'text',
    label: 'Имя',
    value: 'Роман',
    placeholder: 'Введите',
    required: true,
    classes: 'text-sm text-gray border-0 w-1/2 text-right focus:text-blue-dark',
  },
  {
    id: 'second_name',
    name: 'second_name',
    type: 'text',
    label: 'Фамилия',
    placeholder: 'Введите',
    value: 'Миронов',
    required: true,
    classes: 'text-sm text-gray border-0 w-1/2 text-right focus:text-blue-dark',
  },
  {
    id: 'nickname',
    name: 'nickname',
    type: 'text',
    label: 'Имя в чате',
    placeholder: 'Введите',
    value: 'Tenutes',
    required: true,
    classes: 'text-sm text-gray border-0 w-1/2 text-right focus:text-blue-dark',
  },
  {
    id: 'phone',
    name: 'phone',
    type: 'tel',
    label: 'Телефон',
    value: '+7 (925) 562-16-59',
    placeholder: 'Введите',
    required: true,
    classes: 'text-sm text-gray border-0 w-1/2 text-right focus:text-blue-dark',
  },
];

export default {
  fields,
};
