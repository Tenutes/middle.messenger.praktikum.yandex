import Registry from '../Registry/Registry';
import Validator from '../Validator/Validator';
import FormError from './FormError';

export default class Form implements IForm {
  id: string;
  form: HTMLFormElement;
  validator: Validator;
  values: Record<string, unknown>;
  errors: StringRecord;
  errorMessages: StringRecord;

  constructor(id: string) {
    this.id = id;
    const form = document.getElementById(id);
    if (!form) {
      throw new Error('There is no Form with id:' + id);
    }
    this.form = <HTMLFormElement>form;
    this.validator = new Validator();
    this.errorMessages = {};
    this.errors = {};
    this.values = {};

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

  addValidationRules(rules: ValidatorRules) {
    for (const [field, validation] of Object.entries(rules)) {
      const formField = <FormElement>this.form.querySelector(`[name='${field}']`);
      if (Array.isArray(validation)) {
        validation.forEach(validationRule => {
          this.addValidation(formField, validationRule);
        });
      } else {
        this.addValidation(formField, validation);
      }
    }
  }

  addValidation(field: FormElement, validation: ValidationRule): this {
    this.validator.setValidation(field, validation.fn.bind(field));
    if (validation.errorReplacer) {
      this.errorMessages[field.name] = validation.errorReplacer;
    }
    return this;
  }

  isValid() {
    this.errors = {};
    this.hideErrors();

    const result = this.validator.validateAll();
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
    if (!success) {
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
      if (label) {
        label.remove();
      }
    }
  }

  showError(name: string, messageTemplate?: string) {
    if (!messageTemplate) {
      return;
    }
    const element = this.form.querySelector(`[name="${name}"]`);
    const replacer = this.errorMessages[name] || 'Поле';
    const message = messageTemplate.replace('{{field}}', replacer);
    if (element) {
      this.errors[name] = message;
      element.classList.add('!text-red', 'error');
      if (element.parentElement) {
        const errorLabel = <HTMLLabelElement>element.parentElement.querySelector(`label[for="${name}"].error`);
        if (errorLabel) {
          errorLabel.innerText = message;
        } else {
          const errorChild = FormError.render(name, message);
          element.parentElement.appendChild(errorChild);
        }
      }
    }
  }
}
