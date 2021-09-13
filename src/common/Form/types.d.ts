type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

interface IForm {
  id: string;
  form: HTMLFormElement;
  values: Record<string, unknown>;
  errors: StringRecord;

  getValues(): Record<string, unknown>;

  isValid(): boolean;

  getFormData(): FormData;

  addValidation(field: FormElement, validation: () => ValidationResult): this;

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
