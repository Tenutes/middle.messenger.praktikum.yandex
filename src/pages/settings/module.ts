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
import { required } from '../../common/Validator/Validator';

export default async () => {
  const updateForm: HTMLFormElement | null = document.querySelector('form#form-settings');
  const changePasswordForm: HTMLFormElement | null = document.querySelector('form#form-change-password');

  if (updateForm) {
    validateFormOnFieldFocusBlur(updateForm);
    const validations = {
      email: emailMatch,
      login: loginMatch,
      first_name: nameMatch,
      second_name: nameMatch,
      phone: phoneMatch,
      nickname: required,
    };
    const formData = await validateFormOnSubmit(updateForm, validations).catch(() => {});

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
    const password = <FormElement>changePasswordForm.querySelector('input[name="password_new"]');
    const passwordRepeat = <FormElement>changePasswordForm.querySelector('input[name="password_new_repeat"]');
    const validations = {
      password_new_repeat: [() => equalsMatch(password, passwordRepeat), passwordMatch],
      password: passwordMatch,
      password_new: passwordMatch,
    };
    const formData = await validateFormOnSubmit(changePasswordForm, validations).catch(() => {});
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
