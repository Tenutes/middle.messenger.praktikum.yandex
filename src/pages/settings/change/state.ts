import { InputProps } from '../../../components/Input';

const fields: InputProps[] = [
  {
    id: 'password',
    name: 'password',
    type: 'password',
    label: 'Старый пароль',
    placeholder: 'Введите',
    required: true,
    classes: 'text-sm text-gray border-0 w-1/2 text-right focus:text-blue-dark',
  },
  {
    id: 'password_new',
    name: 'password_new',
    type: 'password',
    label: 'Новый пароль',
    placeholder: 'Введите',
    required: true,
    classes: 'text-sm text-gray border-0 w-1/2 text-right focus:text-blue-dark',
  },
  {
    id: 'password_new_repeat',
    name: 'password_new_repeat',
    type: 'password',
    label: 'Повторите пароль',
    placeholder: 'Введите',
    required: true,
    classes: 'text-sm text-gray border-0 w-1/2 text-right focus:text-blue-dark',
  },
];

export default {
  fields,
};
