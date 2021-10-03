type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

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
