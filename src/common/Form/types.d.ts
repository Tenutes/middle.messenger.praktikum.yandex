type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface IForm {
  id: string;
  form: HTMLFormElement;
  values: Record<string, unknown>;
  errors: StringRecord;
  errorMessages: StringRecord;

  getValues(): Record<string, unknown>;

  isValid(): boolean;

  getFormData(): FormData;

  addValidationRules(rules: ValidatorRawRules): void;

  addValidation(field: FormElement, validation: ValidationRule): this;

  validateField(field: FormElement): void;

  handleValidationResult(field: FormElement, result: ValidationResult): void;

  clear(): void;

  hideErrors(): void;

  hideError(name: string): void;

  showError(name: string, message: string): void;
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

interface IFormError {
  classNames: string[];

  render(fieldName: string, messageTemplate: string): Node;
}
