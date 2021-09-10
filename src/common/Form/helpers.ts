import Form from './Form';
import Sender from './Sender';

export const validateFormOnSubmit = (form: HTMLFormElement) => {
  return new Promise((res, rej) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formObject = new Form(form.id);
      if (formObject.isValid()) {
        console.log(formObject.getValues());
        return res(formObject.getValues());
      }

      console.log('form invalid');
      return rej();
    });
  });
};

export const sendForm = (form: HTMLFormElement, { url, options }: ISenderOptions) => {
  const sender = new Sender(form, { url, options });

  return new Promise((res, rej) => {
    sender
      .send()
      .then(res)
      .catch(rej);
  });
};
