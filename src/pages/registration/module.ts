import Form from '../../common/Form/Form';
import Sender from '../../common/Form/Sender';

export default () => {
  const form = document.querySelector('form#form-register');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formObject = new Form(form.id);
      if (formObject.isValid()) {
        const sender = new Sender(formObject.form, '/test/url');
        console.log(formObject.getValues());
        sender.send().then((data: unknown) => {
          console.log(data);
        });
        return;
      }
      console.log('form invalid');
    });
  }
};
