import Form from '../../common/Form/Form';

export default () => {
  const form = document.querySelector('form#form-register');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formObject = new Form(form.id);
    if (formObject.isValid()) {
      console.log('form valid');
      return;
    }
    console.log('form invalid');
  });
}
