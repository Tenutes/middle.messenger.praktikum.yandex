import Registry from '../Registry/Registry';
import Validate from './Validate';
import { VALIDATOR_ERROR_CODES, VALIDATOR_ERROR_CODES_NAMES } from './constants';

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

  static get(id: string): IForm {
    let instance = <IForm>Registry.get('Form', id);
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

    const fields: FormElement[] = Array.from(this.form.querySelectorAll('input:not([type=hidden]), textarea, select'));
    fields.forEach(this.validateField.bind(this));

    const passwords: FormElement[] = fields.filter(field => field.name.startsWith('password'));
    if (passwords.length > 1) {
      this.validatePasswords(<HTMLInputElement[]>passwords);
    }
    return Object.keys(this.errors).length === 0;
  }

  validateField(field: FormElement) {
    const { success, error }: ValidationResult = Validate.isFieldValid(field);
    if (success) {
      this.hideError(field.name);
    } else {
      this.showError(field.name, error.messageTemplate);
    }
  }

  validatePasswords(passwords: HTMLInputElement[]) {
    const mainPasswordField = passwords.find(({ name }: HTMLInputElement) => name === 'password');
    const mainNewPasswordField = passwords.find(({ name }: HTMLInputElement) => name === 'password_new');
    if (mainNewPasswordField) {
      const repeater = passwords.find(({ name }: HTMLInputElement) => name === 'password_new_repeat');
      this.validatePasswordMatch(mainNewPasswordField, repeater);
    }

    if (mainPasswordField) {
      const repeater = passwords.find(({ name }: HTMLInputElement) => name === 'password_repeat');
      this.validatePasswordMatch(mainPasswordField, repeater);
    }
  }

  validatePasswordMatch(password: HTMLInputElement, password_repeater: HTMLInputElement | undefined) {
    if (password_repeater && password_repeater.value !== password.value) {
      this.showError(password.name, VALIDATOR_ERROR_CODES_NAMES[VALIDATOR_ERROR_CODES.FIELDS_NO_MATCH]);
      this.showError(password_repeater.name, VALIDATOR_ERROR_CODES_NAMES[VALIDATOR_ERROR_CODES.FIELDS_NO_MATCH]);
    }
  }

  clear() {
    const added = <FormElement[]>(
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

  showError(name: string, messageTemplate: string) {
    const element = this.form.querySelector(`[name="${name}"]`);
    const message = this.generateMessageFromTemplate(name, messageTemplate);
    if (element) {
      this.errors[name] = message;
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

  generateMessageFromTemplate(fieldName: string, messageTemplate: string) {
    const replacer = this.getReplacerByFieldName(fieldName);

    return messageTemplate.replace('{{field}}', replacer);
  }

  getReplacerByFieldName(fieldName: string) {
    switch (fieldName) {
      case 'login': {
        return 'Логин';
      }
      case 'password':
      case 'password_new':
      case 'password_repeat':
      case 'password_new_repeat': {
        return 'Пароль';
      }
      case 'first_name': {
        return 'Имя';
      }
      case 'second_name': {
        return 'Фамилия';
      }
      case 'email': {
        return 'Почта';
      }
      case 'phone': {
        return 'Телефон';
      }
      default: {
        return 'Поле';
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
