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
      email: emailMatch,
      login: loginMatch,
      first_name: nameMatch,
      second_name: nameMatch,
      phone: phoneMatch,
      password_repeat: [() => equalsMatch(password, passwordRepeat), passwordMatch],
      password: passwordMatch,
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
