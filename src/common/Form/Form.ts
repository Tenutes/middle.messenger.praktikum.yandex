import Registry from '../Registry/Registry';
import Validator from '../Validator/Validator';

export default class Form implements IForm {
  id;
  form;
  validator: Validator;
  values: Record<string, unknown> = {};
  errors: StringRecord = {};

  constructor(id: string) {
    this.id = id;
    const form = document.getElementById(id);
    if (!form) {
      throw new Error('There is no Form with id:' + id);
    }
    this.form = <HTMLFormElement>form;
    this.validator = new Validator();

    return this;
  }

  static get(id: string): Form {
    let instance = <Form>Registry.get('Form', id);
    if (instance) {
      return instance;
    }

    instance = new Form(id);
    Registry.set('Form', id, instance);

    return instance;
  }

  getFormData() {
    return new FormData(this.form);
  }

  getValues() {
    const formData = this.getFormData();
    this.values = {};

    for (const [key, value] of formData.entries()) {
      this.values[key] = value;
    }

    return this.values;
  }

  addValidationRules(rules: ValidatorRawRules) {
    for (const [field, validation] of Object.entries(rules)) {
      const formField = <FormElement>this.form.querySelector(`[name='${field}']`);
      if (Array.isArray(validation)) {
        validation.forEach(validationRule => {
          this.addValidation(formField, validationRule.bind(formField));
        });
      } else {
        this.addValidation(formField, validation.bind(formField));
      }
    }
  }

  addValidation(field: FormElement, validation: ValidationFn): this {
    this.validator.setValidation(field, validation);
    return this;
  }

  isValid() {
    this.errors = {};

    const result = this.validator.validateAll();
    console.log(result);
    result.forEach((validationResult: ValidationAllResult) => {
      this.handleValidationResult(<FormElement>validationResult.field, validationResult.result);
    });

    return Object.keys(this.errors).length === 0;
  }

  validateField(field: FormElement) {
    const validationResult: ValidationResult = this.validator.validate(field);
    this.handleValidationResult(field, validationResult);
  }

  handleValidationResult(field: FormElement, validationResult: ValidationResult) {
    const { success, error }: ValidationResult = validationResult;
    if (success) {
      this.hideError(field.name);
    } else {
      this.showError(field.name, error.messageTemplate);
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

  showError(name: string, messageTemplate?: string) {
    if (!messageTemplate) {
      return;
    }
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
