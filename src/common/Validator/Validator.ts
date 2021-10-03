import { VALIDATOR_ERROR_CODES, VALIDATOR_ERROR_CODES_NAMES } from './constants';

export function required(element: FormElement): ValidationResult {
  let success = false;
  switch (element.tagName) {
    case 'INPUT': {
      if (['checkbox', 'radio'].includes(element.type)) {
        success = (<HTMLInputElement>element).checked;
        break;
      }
      success = Boolean(element.value);
      break;
    }
    case 'TEXTAREA':
    case 'SELECT':
      success = Array.isArray(element.value) ? Boolean(element.value.length) : Boolean(element.value);
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

export function equalsTo(from: FormElement, to: FormElement): ValidationResult {
  let success = false;
  switch (from.tagName) {
    case 'INPUT': {
      if (['checkbox', 'radio'].includes(from.type)) {
        success = (<HTMLInputElement>from).checked = (<HTMLInputElement>to).checked;
        break;
      }
      success = Boolean(from.value) && from.value === to.value;
      break;
    }
    case 'TEXTAREA':
    case 'SELECT':
      success = Array.isArray(from.value)
        ? JSON.stringify(from.value) === JSON.stringify(to.value)
        : from.value === to.value;
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

export function match(value: string, pattern: RegExp): ValidationResult {
  const success = pattern.test(value);
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
    return this.validations.map(({ field, validation }) => {
      return {
        field: field,
        result: this.validate(field, validation),
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

  validate(field: FormElement, validation: ValidationFn): ValidationResult {
    if (!field || !validation) {
      return this.defaultValidationNotFound();
    }

    return validation(field.value);
  }
}
