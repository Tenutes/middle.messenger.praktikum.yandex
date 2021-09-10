import { sendForm, validateFormOnFieldFocusBlur, validateFormOnSubmit } from '../../common/Form/helpers';
import { METHODS } from '../../common/Fetch/constants';

export default async () => {
  const form: HTMLFormElement | null = document.querySelector('form#form-login');
  if (form) {
    validateFormOnFieldFocusBlur(form);
    const formData = await validateFormOnSubmit(form).catch(() => {});
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
