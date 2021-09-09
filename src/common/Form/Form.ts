import Registry from '../Registry/Registry';
import Validate from './Validate';

export default class Form implements IForm {
  id;
  form;
  values: StringRecord = {};
  errors: StringRecord = {};

  constructor(id: string) {
    this.id = id;
    const form = document.getElementById(id);
    if (!form) {
      throw new Error('There is no Form with id:' + id);
    }
    this.form = <HTMLFormElement>form;

    return this;
  }

  static get(id: string) {
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
    if (this.form) {
      const inputs = <HTMLInputElement[]>Array.from(this.form.querySelectorAll('[name]'));

      inputs.forEach((input: HTMLInputElement) => {
        this.values[input.name] = input.value;
      });
    }

    return this.values;
  }

  isValid() {
    this.errors = {};
    this.values = this.getValues();

    const phone: HTMLInputElement | null = this.form.querySelector('[name="phone"]');
    const login: HTMLInputElement | null = this.form.querySelector('[name="login"]');
    const names: HTMLInputElement[] = Array.from(
      this.form.querySelectorAll('[name="first_name"], [name="second_name"]')
    );
    const passwords: HTMLInputElement[] = Array.from(this.form.querySelectorAll('input[type="password"]'));
    const email: HTMLInputElement | null = this.form.querySelector('[name="email"]');
    const required: HTMLInputElement[] = Array.from(this.form.querySelectorAll('[required]'));

    if (phone) {
      const value = this.values.phone;
      if (value.length && !Validate.phone(value)) {
        const message = 'Укажите корректный телефон';
        this.errors.phone = message;
        this.showError('phone', message);
      } else {
        this.hideError('phone');
      }
    }

    if (email) {
      const value = this.values.email;
      if (value.length && !Validate.email(value)) {
        const message = 'Укажите корректный Email';
        this.errors.email = message;
        this.showError('email', message);
      } else {
        this.hideError('email');
      }
    }

    if (login) {
      const value = this.values.login;

      if (!Validate.login(value)) {
        const message = 'Логин не соответствует условиям';
        this.errors.login = message;
        this.showError(login.name, message);
      } else {
        this.hideError(login.name);
      }
    }

    if (names.length) {
      names.forEach(name => {
        const value = this.values[name.name];

        if (!Validate.validateName(value)) {
          const message = 'Пароль не соответствует условиям';
          this.errors[name.name] = message;
          this.showError(name.name, message);
        } else {
          this.hideError(name.name);
        }
      });
    }

    if (passwords.length) {
      passwords.forEach(password => {
        const value = this.values[password.name];

        if (!Validate.password(value)) {
          const message = 'Пароль не соответствует условиям';
          this.errors[password.name] = message;
          this.showError(password.name, message);
        } else {
          this.hideError(password.name);
        }
      });
    }

    for (let i = 0; i < required.length; i++) {
      const element = <HTMLInputElement>required[i];

      if (element.value === '') {
        const message = 'Поле обязательно для заполнения';
        element.classList.add('error');
        this.errors[element.name] = message;
        this.showError(element.name, message);
      } else {
        if (!this.errors[element.name]) {
          this.hideError(element.name);
        }
      }
    }

    return Object.keys(this.errors).length === 0;
  }

  clear() {
    const added = <HTMLInputElement[]>(
      Array.from(this.form.querySelectorAll('input:not([type="hidden"]):not([type="submit"]), select, textarea'))
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

  hideError(name: string) {
    const element = this.form.querySelector(`[name="${name}"]`);

    if (element) {
      element.classList.remove('error', '!text-red');
      const label = this.form.querySelector(`label[for="${name}"].error`);
      label && label.remove();
    }
  }

  showError(name: string, message: string) {
    const element = this.form.querySelector(`[name="${name}"]`);
    if (element) {
      element.classList.add('!text-red', 'error');
      if (element.parentElement) {
        const errorLabel = <HTMLLabelElement>element.parentElement.querySelector(`label[for="${name}"].error`);
        if (errorLabel) {
          errorLabel.innerText = message;
        } else {
          const errorChild = this.generateErrorLabel(name, message);
          element.parentElement.appendChild(errorChild);
        }
      }
    }
  }

  generateErrorLabel(name: string, message: string) {
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
    label.setAttribute('for', name);
    label.setAttribute('generated', 'true');
    label.classList.add(...labelClasses);
    label.innerText = message;
    return label;
  }
}
