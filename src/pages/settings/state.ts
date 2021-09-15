import Back from '../../components/Back/back';
import Link from '../../components/Link/link';
import Input from '../../components/Input/input';
import SettingsProfile from '../../modules/SettingsProfile/settings-profile';
import Button from '../../components/Button/button';

const backProps: BackProps = {
  link: '/chat-list',
};

const innerBackProps: BackProps = {
  link: '/settings',
};

const exitLinkProps: LinkProps = {
  href: '/',
  classes: 'text-red text-sm font-medium decoration-none hover:underline',
  label: 'Выйти',
};

const changeDataLinkProps: LinkProps = {
  href: '/settings/update/',
  classes: 'text-blue text-sm font-medium decoration-none hover:underline',
  label: 'Изменить данные',
};

const changePasswordLinkProps: LinkProps = {
  href: '/settings/change-password/',
  extra: 'data-popup="popup-change-password"',
  classes: 'text-blue text-sm font-medium decoration-none hover:underline',
  label: 'Изменить пароль',
};

const innerButtonProps: ButtonProps = {
  classes:
    'text-white bg-blue hover:opacity-80 text-base focus:bg-blue-dark active:bg-blue-dark min-w-[280px] text-center px-4 py-2 rounded-4',
  label: 'Сохранить',
};

const settingsProfileProps: SettingsProfileProps = {
  name: 'Роман',
};

const fields = [
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

const changePasswordFields: InputProps[] = [
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

const settingsProfile = new SettingsProfile(settingsProfileProps).getContent();
const backInnerButton = new Back(innerBackProps).getContent();
const innerButton = new Button(innerButtonProps).getContent();

const state = {
  settings: {
    back: new Back(backProps).getContent(),
    exitLink: new Link(exitLinkProps).getContent(),
    changeDataLink: new Link(changeDataLinkProps).getContent(),
    changePasswordLink: new Link(changePasswordLinkProps).getContent(),
    settingsProfile,
    fields,
  },
  update: {
    settingsProfile,
    fields: fields.map(field => ({
      label: field.label,
      input: new Input({ ...field, label: false }).getContent(),
    })),
    back: backInnerButton,
    button: innerButton,
  },
  changePassword: {
    settingsProfile,
    button: innerButton,
    back: backInnerButton,
    fields: changePasswordFields.map(field => ({
      label: field.label,
      input: new Input({ ...field, label: false }).getContent(),
    })),
  },
};

export default state;
