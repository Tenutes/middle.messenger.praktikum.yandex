interface ValidatorError {
  messageTemplate: VALIDATOR_ERROR_CODES_NAMES | null;
  type: VALIDATOR_ERROR_CODES;
}

interface ValidationResult {
  success: boolean;
  error: ValidationError | null;
}
