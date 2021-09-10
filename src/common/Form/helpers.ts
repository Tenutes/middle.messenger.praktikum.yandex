import Form from './Form';
import Sender from './Sender';

export const addFormEvents = (form: HTMLFormElement, url: string) => {
  const FormObject = Form.get(form.id);
  Array.from(form.querySelectorAll('input')).forEach(input => {
    input.addEventListener('input', () => FormObject.hideError(input.name));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formObject = new Form(form.id);
    if (formObject.isValid()) {
      const sender = new Sender(formObject.form, url);
      console.log(formObject.getValues());
      sender.send().then((data: unknown) => {
        console.log(data);
      });
      return;
    }
    console.log('form invalid');
  });
};
