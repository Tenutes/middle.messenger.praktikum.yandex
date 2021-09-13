interface ValidatorError {
  messageTemplate: VALIDATOR_ERROR_CODES_NAMES | null;
  type: VALIDATOR_ERROR_CODES;
}

interface ValidationResult {
  success: boolean;
  error: ValidationError | null;
}

interface ValidationAllResult {
  field: FormElement | string;
  result: ValidationResult;
}

interface ValidatorValidation {
  field: FormElement | string;
  validation: ValidationFn;
}

type ValidationFn = (ctx?: unknown) => ValidationResult;

interface ValidationRule {
  fn: ValidationFn;
  errorReplacer?: string;
}

type ValidatorRules = Record<string, ValidationRule | ValidationRule[]>;
