import { loginMatch, passwordMatch } from '../../common/Validator/constants';

export default {
  fields: [
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
      id: 'password',
      type: 'password',
      name: 'password',
      required: true,
      label: 'Пароль',
      classes: 'border-b border-blue w-full py-1 text-base text-black',
      validations: [{ fn: passwordMatch, errorReplacer: 'Пароль' }],
    },
  ],
};
