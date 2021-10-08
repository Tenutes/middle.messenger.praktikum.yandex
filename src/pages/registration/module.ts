import { sendForm, validateFormOnFieldFocusBlur, validateFormOnSubmit } from '../../common/Form/helpers';
import { METHODS } from '../../common/Fetch/constants';
import {
  emailMatch,
  equalsMatch,
  loginMatch,
  nameMatch,
  passwordMatch,
  phoneMatch,
} from '../../common/Validator/constants';

export default async () => {
  const form: HTMLFormElement | null = document.querySelector('form#form-register');
  if (form) {
    validateFormOnFieldFocusBlur(form);
    const password = <FormElement>form.querySelector('input[name="password"]');
    const passwordRepeat = <FormElement>form.querySelector('input[name="password_repeat"]');
    const validations = {
      email: { fn: emailMatch, errorReplacer: 'Почта' },
      login: { fn: loginMatch, errorReplacer: 'Логин' },
      first_name: { fn: nameMatch, errorReplacer: 'Имя' },
      second_name: { fn: nameMatch, errorReplacer: 'Фамилия' },
      phone: { fn: phoneMatch, errorReplacer: 'Телефон' },
      password_repeat: [
        { fn: () => equalsMatch(password, passwordRepeat), errorReplacer: 'Пароли' },
        { fn: passwordMatch, errorReplacer: 'Пароль' },
      ],
      password: { fn: passwordMatch, errorReplacer: 'Пароль' },
    };
    const formData = await validateFormOnSubmit(form, validations).catch(() => {});
    if (formData) {
      const options = {
        url: 'test/url',
        options: {
          method: METHODS.POST,
        },
      };
      await sendForm(form, options).catch(() => {
        // пока без API
        location.href = '/chat-list';
      });
      location.href = '/chat-list';
    }
  }
};
