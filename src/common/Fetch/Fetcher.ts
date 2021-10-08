import { queryStringify } from './helpers';
import { METHODS } from './constants';

class HTTPTransport implements IHTTPTransport {
  get(url: string, options: HTTPOptions) {
    url = url + queryStringify(options.data || {});
    const { httpOptions, timeout } = this.prepareOptions(options, METHODS.GET);
    return this.request(url, httpOptions, timeout);
  }
  post(url: string, options: HTTPOptions) {
    const { httpOptions, timeout } = this.prepareOptions(options, METHODS.POST);
    return this.request(url, httpOptions, timeout);
  }
  put(url: string, options: HTTPOptions) {
    const { httpOptions, timeout } = this.prepareOptions(options, METHODS.PUT);
    return this.request(url, httpOptions, timeout);
  }
  delete(url: string, options: HTTPOptions) {
    const { httpOptions, timeout } = this.prepareOptions(options, METHODS.DELETE);
    return this.request(url, httpOptions, timeout);
  }

  prepareOptions(options: HTTPOptions, method: METHODS) {
    const data = queryStringify(options.data || {});
    const httpOptions = { ...options, method, data };
    const timeout = options.timeout || undefined;
    return { httpOptions, timeout };
  }

  request(url: string, options: HTTPRequestOptions, timeout = 5000) {
    const { headers = {}, data, method } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.timeout = timeout;

      Object.entries(headers).forEach(([header, value]) => {
        xhr.setRequestHeader(header, value);
      });

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

export default new HTTPTransport();
