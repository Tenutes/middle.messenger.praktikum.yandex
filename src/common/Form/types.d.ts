type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface IForm {
  id: string;
  form: HTMLFormElement;
  values: StringRecord;
  errors: StringRecord;

  getValues(id: string): Record<string, string>;

  isValid(): boolean;

  validatePasswords(passwords: HTMLInputElement[]): void;

  validatePasswordMatch(password: HTMLInputElement, password_repeater: HTMLInputElement | undefined): void;

  validateField(field: FormElement): void;

  clear(): void;

  hideErrors(): void;

  hideError(name: string): void;

  generateMessageFromTemplate(fieldName: string, messageTemplate: string): string;

  getReplacerByFieldName(fieldName: string): string;

  showError(name: string, message: string): void;

  generateErrorLabel(name: string, message: string): HTMLElement;
}

interface ISender {
  readonly form;
  readonly formData: Record<string, unknown>;
  url: string;
  headers: Record<string, string>;
  type: string;
  options: HTTPOptions;

  send(): Promise;

  _getDataFromForm(): Record<string, unknown>;
}

interface ISenderOptions {
  url: string;
  options: HTTPRequestOptions;
}

interface ValidatorError {
  messageTemplate: VALIDATOR_ERROR_CODES_NAMES | null;
  type: VALIDATOR_ERROR_CODES;
}

interface ValidationResult {
  success: boolean;
  error: ValidationError | null;
}
