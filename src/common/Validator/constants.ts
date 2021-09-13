export enum VALIDATOR_ERROR_CODES {
  FIELD_REQUIRED = 'FIELD_REQUIRED',
  FIELD_INCORRECT = 'FIELD_INCORRECT',
  FIELDS_NO_MATCH = 'FIELDS_NO_MATCH',
  NO_VALIDATION_FOUND = 'NO_VALIDATION_FOUND',
}

export enum VALIDATOR_ERROR_CODES_NAMES {
  FIELD_REQUIRED = 'Поле "{{field}}" является обязательным',
  FIELD_INCORRECT = 'Введите корректное значение поля "{{field}}"',
  FIELDS_NO_MATCH = '"{{field}}" не совпадает',
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
