import { addFormEvents } from '../../common/Form/helpers';

export default () => {
  const form: HTMLFormElement | null = document.querySelector('form#form-login');
  if (form) {
    addFormEvents(form, 'test/url');
  }
};
