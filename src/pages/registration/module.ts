import { sendForm, validateFormOnSubmit } from '../../common/Form/helpers';
import { METHODS } from '../../common/Fetch/constants';

export default async () => {
  const form: HTMLFormElement | null = document.querySelector('form#form-register');
  if (form) {
    const formData = await validateFormOnSubmit(form).catch(() => {});
    if (formData) {
      const options = {
        url: 'test/url',
        options: {
          method: METHODS.POST,
        },
      };
      const response = await sendForm(form, options).catch(() => {});
      console.log(response);
    }
  }
};
