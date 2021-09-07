import Fetcher from '../Fetch/Fetcher';

export default class Sender implements ISender {
  readonly form: HTMLFormElement;
  readonly formData: Record<string, unknown>;
  uri: string;
  headers: Record<string, string> = {};
  type: string = 'text';

  constructor(form: HTMLFormElement, uri: string) {
    this.form = form;
    this.formData = this._getDataFromForm();
    this.uri = uri;
    return this;
  }

  send() {
    return Fetcher.post(this.uri, { data: this.formData }).catch((e: PromiseRejectionEvent) => {
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
