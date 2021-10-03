import Registry from '../Registry/Registry';
import Validator from '../Validator/Validator';
import FormError from './FormError';
import Block from '../Block/Block';
import { InputProps } from '../../components/Input';
import { isArray } from '../../common/helpers';

export default class Form {
  id: string;
  form: HTMLFormElement;
  validator: Validator;
  values: Record<string, unknown>;
  errors: StringRecord;
  errorMessages: StringRecord;
  fieldsToValidate: Block[];

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
    this.fieldsToValidate = [];

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

  addValidationFields(fields: Block[]) {
    fields.forEach(field => this.addValidationField(field));
  }

  addValidationField(field: Block, validation?: ValidationRule | ValidationRule[]): Form {
    if (validation) {
      if (isArray(validation)) {
        validation.forEach(v => {
          this.addValidation(field, v);
        });
      } else {
        this.addValidation(field, validation as ValidationRule);
      }
    }

    const validations = (field.props as InputProps).validations || [];
    validations.forEach(validation => {
      this.addValidation(field, validation);
    });

    return this;
  }

  addValidation(field: Block, validation: ValidationRule) {
    const name = (field.element as FormElement).name;
    if (name) {
      this.errorMessages[name] = validation.errorReplacer || '';
    }
    this.validator.setValidation(field.element as FormElement, validation.fn);
  }

  isValid() {
    this.hideErrors();

    const validationResults = this.validator.validateAll();

    validationResults.forEach(({ field, result }) => {
      this.handleValidationResult(field, result);
    });

    return Object.keys(this.errors).length === 0;
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
    for (const name in this.errors) {
      this.hideError(name);
    }

    this.errors = {};
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
