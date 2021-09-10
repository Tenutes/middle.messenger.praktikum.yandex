import Fetcher from '../Fetch/Fetcher';

export default class Sender implements ISender {
  readonly form: HTMLFormElement;
  readonly formData: Record<string, unknown>;
  url: string;
  headers: Record<string, string> = {};
  type: string = 'text';
  options: HTTPOptions;

  constructor(form: HTMLFormElement, { url, options }: ISenderOptions) {
    this.form = form;
    this.formData = this._getDataFromForm();
    this.url = url;
    this.options = { ...options, data: this._getDataFromForm() };
    return this;
  }

  send() {
    return Fetcher.post(this.url, this.options).catch((e: PromiseRejectionEvent) => {
      console.log(e);
    });
  }

  _getDataFromForm() {
    const formData = new FormData(this.form);
    const result: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      result[key] = value;
    }

    return result;
  }
}
