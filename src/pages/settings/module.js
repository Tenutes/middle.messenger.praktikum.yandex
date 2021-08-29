import Form from '../../common/Form/Form';

const checkForm = e => {
  e.preventDefault();
  const formObject = new Form(e.target.id);
  if (formObject.isValid()) {
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
