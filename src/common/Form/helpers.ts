import Form from './Form';

export const validateFormOnFieldFocusBlur = (form: HTMLFormElement) => {
  const fields: HTMLInputElement[] = Array.from(form.querySelectorAll('input:not([type=hidden]), textarea'));
  const formObject = Form.get(form.id);
  fields.forEach(field => {
    field.addEventListener('blur', () => {
      if (field.value) {
        // formObject.validateField(field);
      }
    });
    field.addEventListener('focus', () => {
      formObject.hideError(field.name);
    });
  });
};

export const validateFormOnSubmit = (form: HTMLFormElement, validationRules?: ValidatorRules) => {
  return new Promise((res, rej) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formObject = new Form(form.id);
      if (validationRules) {
        // formObject.addValidationRules(validationRules);
      }

      if (formObject.isValid()) {
        return res(formObject.getValues());
      }

      console.log('form invalid');
      return rej();
    });
  });
};

export const capitalizeFirstLetter = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);
