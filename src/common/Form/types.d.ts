interface IForm {
  id: string;
  form: HTMLFormElement;
  values: StringRecord;
  errors: StringRecord;

  getValues(id: string): Record<string, string>;

  isValid(): boolean;

  clear(): void;

  hideErrors(): void;

  hideError(name: string): void;

  showError(name: string, message: string): void;

  generateErrorLabel(name: string, message: string): HTMLElement;
}

interface ISender {
  readonly form;
  readonly formData: Record<string, unknown>;
  uri: string;
  headers: Record<string, string>;
  type: string;

  send(): Promise;

  _getDataFromForm(): Record<string, unknown>;
}
