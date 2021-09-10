import { sendForm, validateFormOnFieldFocusBlur, validateFormOnSubmit } from '../../common/Form/helpers';
import { METHODS } from '../../common/Fetch/constants';

export default async () => {
  const updateForm: HTMLFormElement | null = document.querySelector('form#form-settings');
  const changePasswordForm: HTMLFormElement | null = document.querySelector('form#form-change-password');

  if (updateForm) {
    validateFormOnFieldFocusBlur(updateForm);
    const formData = await validateFormOnSubmit(updateForm).catch(() => {});
    if (formData) {
      const options = {
        url: 'test/url',
        options: {
          method: METHODS.POST,
        },
      };
      const response = await sendForm(updateForm, options).catch(() => {});
      console.log(response);
    }
  }
  if (changePasswordForm) {
    validateFormOnFieldFocusBlur(changePasswordForm);
    const formData = await validateFormOnSubmit(changePasswordForm).catch(() => {});
    if (formData) {
      const options = {
        url: 'test/url',
        options: {
          method: METHODS.POST,
        },
      };
      const response = await sendForm(changePasswordForm, options).catch(() => {});
      console.log(response);
    }
  }
};
