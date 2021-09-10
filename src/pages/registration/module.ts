import { addFormEvents } from '../../common/Form/helpers';

export default () => {
  const form: HTMLFormElement | null = document.querySelector('form#form-register');
  if (form) {
    addFormEvents(form, 'test/url');
  }
};
