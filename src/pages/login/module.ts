import { sendForm, validateFormOnFieldFocusBlur, validateFormOnSubmit } from '../../common/Form/helpers';
import { METHODS } from '../../common/Fetch/constants';
import { loginMatch, passwordMatch } from '../../common/Validator/constants';

export default async () => {
  const form: HTMLFormElement | null = document.querySelector('form#form-login');
  if (form) {
    validateFormOnFieldFocusBlur(form);

    const validations = {
      login: { fn: loginMatch, errorReplacer: 'Логин' },
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
