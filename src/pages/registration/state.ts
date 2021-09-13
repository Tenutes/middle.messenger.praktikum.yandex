import Button from '../../components/Button/button';
import Link from '../../components/Link/link';
import Input from '../../components/Input/input';

const buttonProps: ButtonProps = {
  label: 'Зарегистрироваться',
  classes:
    'w-full text-center bg-blue text-white text-sm font-medium rounded-4 px-4 py-2 mb-2 duration-200 hover:opacity-80 focus:bg-blue-dark active:bg-blue-dark',
};

const linkProps: LinkProps = {
  href: '/',
  label: 'Уже есть аккаунт',
  classes: 'text-blue decoration-none hover:underline duration-200',
};

const inputFields: InputProps[] = [
  {
    id: 'email',
    type: 'email',
    name: 'email',
    required: true,
    label: 'Почта',
    classes: 'border-b border-blue w-full py-1 text-base text-black',
  },
  {
    id: 'login',
    type: 'text',
    name: 'login',
    required: true,
    label: 'Логин',
    classes: 'border-b border-blue w-full py-1 text-base text-black',
  },
  {
    id: 'first_name',
    type: 'text',
    name: 'first_name',
    required: true,
    label: 'Имя',
    classes: 'border-b border-blue w-full py-1 text-base text-black',
  },
  {
    id: 'second_name',
    type: 'text',
    name: 'second_name',
    required: true,
    label: 'Фамилия',
    classes: 'border-b border-blue w-full py-1 text-base text-black',
  },
  {
    id: 'phone',
    type: 'tel',
    name: 'phone',
    required: true,
    label: 'Телефон',
    classes: 'border-b border-blue w-full py-1 text-base text-black',
  },
  {
    id: 'password',
    type: 'password',
    name: 'password',
    required: true,
    label: 'Пароль',
    classes: 'border-b border-blue w-full py-1 text-base text-black',
  },
  {
    id: 'password_repeat',
    type: 'password',
    name: 'password_repeat',
    required: true,
    label: 'Пароль (еще раз)',
    classes: 'border-b border-blue w-full py-1 text-base text-black',
  },
];

export default {
  button: new Button(buttonProps).getContent(),
  link: new Link(linkProps).getContent(),
  fields: inputFields.map(fieldProps => new Input(fieldProps).getContent()),
};
