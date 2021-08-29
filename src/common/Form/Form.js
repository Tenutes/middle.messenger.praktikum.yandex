import Registry from '../Registry/Registry';
import Validate from './Validate';

export default class Form {
  constructor(id) {
    this.id = id;
    this.form = document.getElementById(id);

    return this;
  }

  static get(id) {
    let instance = Registry.get('Form', id);
    if (instance) {
      return instance;
    }

    instance = new Form(id);
    Registry.set('Form', id, instance);

    return instance;
  }

  getValues() {
    this.values = {};
    const inputs = Array.from(this.form.querySelectorAll('[name]'));

    inputs.forEach(input => {
      this.values[input.name] = input.value;
    });
    return this.values;
  }

  getFormData() {
    return new FormData(this.form);
  }

  isValid() {
    let msg;
    let i;
    let value;
    let element;

    this.errors = {};
    this.values = this.getValues();

    const phone = this.form.querySelector('[name="phone"]');
    const email = this.form.querySelector('[name="email"]');
    const required = this.form.querySelectorAll('[required]');

    if (phone) {
      value = this.values.phone;
      if (value.length && !Validate.phone(value)) {
        msg = 'Укажите корректный телефон';
        this.errors.phone = msg;
        this.showError('phone', msg);
      } else {
        this.hideError('phone');
      }
    }

    if (email) {
      value = this.values.email;
      if (value.length && !Validate.email(value)) {
        msg = 'Укажите корректный Email';
        this.errors.email = msg;
        this.showError('email', msg);
      } else {
        this.hideError('email');
      }
    }

    for (i = 0; i < required.length; i++) {
      element = required[i];

      if (element.value === '') {
        msg = 'Поле обязательно для заполнения';
        element.classList.add('error');
        this.errors[element.name] = msg;
        this.showError(element.name, msg);
      } else {
        if (!this.errors[element.name]) {
          this.hideError(element.name);
        }
      }
    }

    return Object.keys(this.errors).length === 0;
  }

  url(value) {
    if (!value) {
      return this.uri;
    }

    this.uri = value;

    return this;
  }

  clear() {
    const added = Array.from(
      this.form.querySelectorAll('input:not([type="hidden"]):not([type="submit"]), select, textarea')
    );
    added.forEach(element => (element.value = ''));
  }

  hideErrors() {
    for (const name in this.values) {
      if (this.values.hasOwnProperty(name)) {
        this.hideError(name);
      }
    }
  }

  hideError(name) {
    const element = this.form.querySelector(`[name="${name}"]`);

    if (element) {
      element.classList.remove('error', '!text-red');
      const label = this.form.querySelector(`label[for="${name}"].error`);
      label && label.remove();
    }
  }

  showError(name, msg) {
    const element = this.form.querySelector(`[name="${name}"]`);
    if (element) {
      element.classList.add('!text-red', 'error');
      const errorLabel = element.parentElement.querySelector(`label[for="${name}"].error`);
      if (errorLabel) {
        errorLabel.innerText = msg;
      } else {
        const errorChild = this.generateErrorLabel(name, msg);
        element.parentElement.appendChild(errorChild);
      }
    }
  }

  generateErrorLabel(name, msg) {
    const label = document.createElement('label');
    const labelClasses = [
      'error',
      'absolute',
      'text-[9px]',
      'top-[calc(100%+2px)]',
      'left-0',
      'text-red',
      'leading-none',
    ];
    label.for = name;
    label.setAttribute('generated', true);
    label.classList.add(...labelClasses);
    label.innerText = msg;
    return label;
  }
}
