import Form from '../../common/Form/Form';

const checkForm = (e: Event) => {
  e.preventDefault();
  const formObject = new Form((<HTMLFormElement>e.target)?.id);
  if (formObject && formObject.isValid()) {
    console.log('form valid');
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
