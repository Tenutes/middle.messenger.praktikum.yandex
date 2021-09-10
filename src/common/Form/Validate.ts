import { VALIDATOR_ERROR_CODES, VALIDATOR_ERROR_CODES_NAMES } from './constants';

export default class Validate {
  static passwordNames = ['password', 'password_new', 'password_repeat', 'password_new_repeat'];
  static loginNames = ['login'];
  static userCredentialNames = ['first_name', 'last_name'];
  static phoneNames = ['phone'];
  static emailNames = ['email'];

  static isFieldValid(field: FormElement): ValidationResult {
    switch (field.tagName) {
      case 'INPUT': {
        return Validate.isInputValid(<HTMLInputElement>field);
      }
      case 'TEXTAREA': {
        return Validate.isTextAreaValid(<HTMLTextAreaElement>field);
      }
      default: {
        return { success: false, error: { type: VALIDATOR_ERROR_CODES.NO_VALIDATION_FOUND } };
      }
    }
  }

  static isInputValid(input: HTMLInputElement): ValidationResult {
    if (Validate.phoneNames.includes(input.name)) {
      return Validate.isPhoneValid(input.value);
    }
    if (Validate.passwordNames.includes(input.name)) {
      return Validate.isPasswordValid(input.value);
    }
    if (Validate.loginNames.includes(input.name)) {
      return Validate.isLoginValid(input.value);
    }
    if (Validate.emailNames.includes(input.name)) {
      return Validate.isEmailValid(input.value);
    }
    if (Validate.userCredentialNames.includes(input.name)) {
      return Validate.isNameValid(input.value);
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
    const regExp = new RegExp(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gi);
    const success = regExp.test(value);
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
    const regExp = new RegExp(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
    );
    const success = regExp.test(value);

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
    const reg: RegExp = new RegExp(/^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/);
    const success = reg.test(name);

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
    const reg: RegExp = new RegExp(/^(?=[a-zA-Z\-_\d]+[a-zA-Z\-_]+|[a-zA-Z\-_]+[a-zA-Z\-_\d]+)[a-zA-Z\-_\d]{3,20}$/gm);
    const isNaN: boolean = Number.isNaN(Number(login));
    const success = reg.test(login) && isNaN;
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
    const reg: RegExp = new RegExp(/^(?=.*\d)(?=.*[A-Z]).{8,40}$/gm);
    const success = reg.test(password);
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
