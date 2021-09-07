import Form from '../../common/Form/Form';
import Sender from '../../common/Form/Sender';

const checkForm = (e: Event) => {
  e.preventDefault();
  const formObject = new Form((<HTMLFormElement>e.target)?.id);
  if (formObject && formObject.isValid()) {
    const sender = new Sender(formObject.form, '/test/url');
    console.log(formObject.getValues());
    sender.send().then((data: unknown) => {
      console.log(data);
    });
    return;
  }
  console.log('form invalid');
};

export default () => {
  const updateForm = document.querySelector('form#form-settings');
  const changePasswordForm = document.querySelector('form#form-change-password');

  if (updateForm) {
    updateForm.addEventListener('submit', checkForm);
  }
  if (changePasswordForm) {
    changePasswordForm.addEventListener('submit', checkForm);
  }
};
