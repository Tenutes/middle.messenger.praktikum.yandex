import { VALIDATOR_ERROR_CODES, VALIDATOR_ERROR_CODES_NAMES } from './constants';

export function required(this: FormElement): ValidationResult {
  let success = false;
  switch (this.tagName) {
    case 'INPUT': {
      if (['checkbox', 'radio'].includes(this.type)) {
        success = (<HTMLInputElement>this).checked;
        break;
      }
      success = Boolean(this.value);
      break;
    }
    case 'TEXTAREA':
    case 'SELECT':
      success = Array.isArray(this.value) ? Boolean(this.value.length) : Boolean(this.value);
      break;
    default:
      break;
  }

  return {
    success,
    error: success
      ? null
      : {
          messageTemplate: VALIDATOR_ERROR_CODES_NAMES[VALIDATOR_ERROR_CODES.FIELD_REQUIRED],
          type: { type: VALIDATOR_ERROR_CODES.FIELD_REQUIRED },
        },
  };
}

export function equalsTo(this: FormElement, to: FormElement): ValidationResult {
  let success = false;
  switch (this.tagName) {
    case 'INPUT': {
      if (['checkbox', 'radio'].includes(this.type)) {
        success = (<HTMLInputElement>this).checked = (<HTMLInputElement>to).checked;
        break;
      }
      success = Boolean(this.value) && this.value === to.value;
      break;
    }
    case 'TEXTAREA':
    case 'SELECT':
      // Переписать json на isEqual (as in lodash)
      success = Array.isArray(this.value)
        ? JSON.stringify(this.value) === JSON.stringify(to.value)
        : this.value === to.value;
      break;
    default:
      break;
  }
  return {
    success,
    error: success
      ? null
      : {
          messageTemplate: VALIDATOR_ERROR_CODES_NAMES[VALIDATOR_ERROR_CODES.FIELDS_NOT_EQUAL],
          type: { type: VALIDATOR_ERROR_CODES.FIELDS_NOT_EQUAL },
        },
  };
}

export function match(this: FormElement, pattern: RegExp): ValidationResult {
  const success = pattern.test(this.value);
  return {
    success,
    error: success
      ? null
      : {
          messageTemplate: VALIDATOR_ERROR_CODES_NAMES[VALIDATOR_ERROR_CODES.FIELD_INCORRECT],
          type: { type: VALIDATOR_ERROR_CODES.FIELD_INCORRECT },
        },
  };
}

export default class Validator {
  validations: ValidatorValidation[];

  constructor() {
    this.validations = [];
  }

  setValidation(field: FormElement, validation: ValidationFn) {
    this.validations.push({ field, validation });
  }

  validateAll(): ValidationAllResult[] {
    return this.validations.map(validation => {
      return {
        field: validation.field,
        result: this.validate(validation),
      };
    });
  }

  defaultValidationNotFound(): ValidationResult {
    return {
      success: false,
      error: {
        type: { type: VALIDATOR_ERROR_CODES.NO_VALIDATION_FOUND },
      },
    };
  }

  validate(field: FormElement | ValidatorValidation | undefined): ValidationResult {
    if (!field) {
      return this.defaultValidationNotFound();
    }

    let validationFn;
    if ('validation' in field) {
      validationFn = field.validation.bind(field.field);
    } else {
      const validation = this.validations.find(validation => validation.field === field);
      if (validation) {
        validationFn = validation.validation.bind(field);
      }
    }
    return validationFn ? validationFn() : this.defaultValidationNotFound();
  }
}
