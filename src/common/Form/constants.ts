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
