import {
  emailRegExp,
  loginRegExp,
  nameRegExp,
  passwordRegExp,
  phoneRegExp,
  VALIDATOR_ERROR_CODES,
  VALIDATOR_ERROR_CODES_NAMES,
} from './constants';

export default class Validator {
  static passwordNames = ['password', 'password_new', 'password_repeat', 'password_new_repeat'];
  static loginNames = ['login'];
  static userCredentialNames = ['first_name', 'last_name'];
  static phoneNames = ['phone'];
  static emailNames = ['email'];

  static isFieldValid(field: FormElement): ValidationResult {
    switch (field.tagName) {
      case 'INPUT': {
        return Validator.isInputValid(<HTMLInputElement>field);
      }
      case 'TEXTAREA': {
        return Validator.isTextAreaValid(<HTMLTextAreaElement>field);
      }
      default: {
        return { success: false, error: { type: VALIDATOR_ERROR_CODES.NO_VALIDATION_FOUND } };
      }
    }
  }

  static isInputValid(input: HTMLInputElement): ValidationResult {
    if (Validator.phoneNames.includes(input.name)) {
      return Validator.isPhoneValid(input.value);
    }
    if (Validator.passwordNames.includes(input.name)) {
      return Validator.isPasswordValid(input.value);
    }
    if (Validator.loginNames.includes(input.name)) {
      return Validator.isLoginValid(input.value);
    }
    if (Validator.emailNames.includes(input.name)) {
      return Validator.isEmailValid(input.value);
    }
    if (Validator.userCredentialNames.includes(input.name)) {
      return Validator.isNameValid(input.value);
    }

    const success = !(input.required && !input.value);

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

  static isTextAreaValid(textArea: HTMLTextAreaElement): ValidationResult {
    const success = !(textArea.required && !textArea.value);
    return {
      success,
      error: success
        ? null
        : {
            messageTemplate: VALIDATOR_ERROR_CODES_NAMES[VALIDATOR_ERROR_CODES.FIELD_REQUIRED],
            type: VALIDATOR_ERROR_CODES.FIELD_REQUIRED,
          },
    };
  }

  static isPhoneValid(value: string | null): ValidationResult {
    if (!value) {
      return {
        success: false,
        error: {
          messageTemplate: VALIDATOR_ERROR_CODES_NAMES[VALIDATOR_ERROR_CODES.FIELD_REQUIRED],
          type: VALIDATOR_ERROR_CODES.FIELD_REQUIRED,
        },
      };
    }
    // Не проверяю длину просто потому, что люди пишут по-разному: с пробелами, с скобками.
    const success = phoneRegExp.test(value);
    return {
      success,
      error: success
        ? null
        : {
            messageTemplate: VALIDATOR_ERROR_CODES_NAMES[VALIDATOR_ERROR_CODES.FIELD_INCORRECT],
            type: VALIDATOR_ERROR_CODES.FIELD_INCORRECT,
          },
    };
  }

  static isEmailValid(value: string | null): ValidationResult {
    if (!value) {
      return {
        success: false,
        error: {
          messageTemplate: VALIDATOR_ERROR_CODES_NAMES[VALIDATOR_ERROR_CODES.FIELD_REQUIRED],
          type: VALIDATOR_ERROR_CODES.FIELD_REQUIRED,
        },
      };
    }
    const success = emailRegExp.test(value);

    return {
      success,
      error: success
        ? null
        : {
            messageTemplate: VALIDATOR_ERROR_CODES_NAMES[VALIDATOR_ERROR_CODES.FIELD_INCORRECT],
            type: VALIDATOR_ERROR_CODES.FIELD_INCORRECT,
          },
    };
  }

  static isNameValid(name: string): ValidationResult {
    const success = nameRegExp.test(name);

    return {
      success,
      error: success
        ? null
        : {
            messageTemplate: VALIDATOR_ERROR_CODES_NAMES[VALIDATOR_ERROR_CODES.FIELD_INCORRECT],
            type: VALIDATOR_ERROR_CODES.FIELD_INCORRECT,
          },
    };
  }

  static isLoginValid(login: string): ValidationResult {
    const isNaN: boolean = Number.isNaN(Number(login));
    const success = loginRegExp.test(login) && isNaN;
    return {
      success,
      error: success
        ? null
        : {
            messageTemplate: VALIDATOR_ERROR_CODES_NAMES[VALIDATOR_ERROR_CODES.FIELD_INCORRECT],
            type: VALIDATOR_ERROR_CODES.FIELD_INCORRECT,
          },
    };
  }

  static isPasswordValid(password: string): ValidationResult {
    const success = passwordRegExp.test(password);
    return {
      success,
      error: success
        ? null
        : {
            messageTemplate: VALIDATOR_ERROR_CODES_NAMES[VALIDATOR_ERROR_CODES.FIELD_INCORRECT],
            type: VALIDATOR_ERROR_CODES.FIELD_INCORRECT,
          },
    };
  }
}
