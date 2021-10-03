import { InputProps } from '../../components/Input';
import {
  emailMatch,
  // equalsMatch,
  loginMatch,
  nameMatch,
  passwordMatch,
  phoneMatch,
} from '../../common/Validator/constants';

const inputFields: InputProps[] = [
  {
    id: 'email',
    type: 'email',
    name: 'email',
    required: true,
    label: 'Почта',
    classes: 'border-b border-blue w-full py-1 text-base text-black',
    validations: [{ fn: emailMatch, errorReplacer: 'Почта' }],
  },
  {
    id: 'login',
    type: 'text',
    name: 'login',
    required: true,
    label: 'Логин',
    classes: 'border-b border-blue w-full py-1 text-base text-black',
    validations: [{ fn: loginMatch, errorReplacer: 'Логин' }],
  },
  {
    id: 'first_name',
    type: 'text',
    name: 'first_name',
    required: true,
    label: 'Имя',
    classes: 'border-b border-blue w-full py-1 text-base text-black',
    validations: [{ fn: nameMatch, errorReplacer: 'Имя' }],
  },
  {
    id: 'second_name',
    type: 'text',
    name: 'second_name',
    required: true,
    label: 'Фамилия',
    classes: 'border-b border-blue w-full py-1 text-base text-black',
    validations: [{ fn: nameMatch, errorReplacer: 'Фамилия' }],
  },
  {
    id: 'phone',
    type: 'tel',
    name: 'phone',
    required: true,
    label: 'Телефон',
    classes: 'border-b border-blue w-full py-1 text-base text-black',
    validations: [{ fn: phoneMatch, errorReplacer: 'Телефон' }],
  },
  {
    id: 'password',
    type: 'password',
    name: 'password',
    required: true,
    label: 'Пароль',
    classes: 'border-b border-blue w-full py-1 text-base text-black',
    validations: [{ fn: passwordMatch, errorReplacer: 'Пароль' }],
  },
  {
    id: 'password_repeat',
    type: 'password',
    name: 'password_repeat',
    required: true,
    label: 'Пароль (еще раз)',
    classes: 'border-b border-blue w-full py-1 text-base text-black',
    validations: [{ fn: passwordMatch, errorReplacer: 'Пароль' }],
  },
];

export default {
  fields: inputFields,
};
