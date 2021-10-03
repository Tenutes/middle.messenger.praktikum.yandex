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

export const LOGIN_REG_EXP = new RegExp(
  /^(?=[a-zA-Z\-_\d]+[a-zA-Z\-_]+|[a-zA-Z\-_]+[a-zA-Z\-_\d]+)[a-zA-Z\-_\d]{3,20}$/
);
export const PASSWORD_REG_EXP = new RegExp(/^(?=.*\d)(?=.*[A-Z]).{8,40}$/);
export const NAME_REG_EXP = new RegExp(/^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/);
export const EMAIL_REG_EXP = new RegExp(
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
);
export const PHONE_REG_EXP = new RegExp(
  /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/i
);

export function loginMatch(value: string): ValidationResult {
  return match(value, LOGIN_REG_EXP);
}

export function passwordMatch(value: string): ValidationResult {
  return match(value, PASSWORD_REG_EXP);
}

export function nameMatch(value: string): ValidationResult {
  return match(value, NAME_REG_EXP);
}

export function emailMatch(value: string): ValidationResult {
  return match(value, EMAIL_REG_EXP);
}

export function phoneMatch(value: string): ValidationResult {
  return match(value, PHONE_REG_EXP);
}

export function equalsMatch(to: FormElement): (from: FormElement) => ValidationResult {
  return (from: FormElement) => equalsTo(from, to);
}
