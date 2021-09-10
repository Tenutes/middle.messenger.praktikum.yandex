import { addFormEvents } from '../../common/Form/helpers';

export default () => {
  const updateForm: HTMLFormElement | null = document.querySelector('form#form-settings');
  const changePasswordForm: HTMLFormElement | null = document.querySelector('form#form-change-password');

  if (updateForm) {
    addFormEvents(updateForm, 'test/url');
  }
  if (changePasswordForm) {
    addFormEvents(changePasswordForm, 'test/url');
  }
};
