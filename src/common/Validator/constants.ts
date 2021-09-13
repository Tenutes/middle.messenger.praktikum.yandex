import { equalsTo, match } from './Validator';

export enum VALIDATOR_ERROR_CODES {
  FIELD_REQUIRED = 'FIELD_REQUIRED',
  FIELD_INCORRECT = 'FIELD_INCORRECT',
  FIELDS_NOT_EQUAL = 'FIELDS_NOT_EQUAL',
  NO_VALIDATION_FOUND = 'NO_VALIDATION_FOUND',
}

export enum VALIDATOR_ERROR_CODES_NAMES {
  FIELD_REQUIRED = 'Поле "{{field}}" является обязательным',
  FIELD_INCORRECT = 'Введите корректное значение поля "{{field}}"',
  FIELDS_NOT_EQUAL = '"{{field}}" не совпадает',
}

export const loginRegExp = new RegExp(/^(?=[a-zA-Z\-_\d]+[a-zA-Z\-_]+|[a-zA-Z\-_]+[a-zA-Z\-_\d]+)[a-zA-Z\-_\d]{3,20}$/);
export const passwordRegExp = new RegExp(/^(?=.*\d)(?=.*[A-Z]).{8,40}$/);
export const nameRegExp = new RegExp(/^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/);
export const emailRegExp = new RegExp(
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
);
export const phoneRegExp = new RegExp(
  /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/i
);

export function loginMatch(this: FormElement): ValidationResult {
  return match.bind(this)(loginRegExp);
}

export function passwordMatch(this: FormElement): ValidationResult {
  return match.bind(this)(passwordRegExp);
}

export function nameMatch(this: FormElement): ValidationResult {
  return match.bind(this)(nameRegExp);
}

export function emailMatch(this: FormElement): ValidationResult {
  return match.bind(this)(emailRegExp);
}

export function phoneMatch(this: FormElement): ValidationResult {
  return match.bind(this)(phoneRegExp);
}

export function equalsMatch(from: FormElement, to: FormElement): ValidationResult {
  return equalsTo.bind(from)(to);
}
