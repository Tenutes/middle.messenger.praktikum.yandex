import { queryStringify } from './helpers';
import { METHODS } from './constants';

const HTTPTransport: IHTTPTransport = {
  get(url, options) {
    url = url + queryStringify(options.data || {});
    const { httpOptions, timeout } = this.prepareOptions(options, METHODS.GET);
    return this.request(url, httpOptions, timeout);
  },
  post(url, options) {
    const { httpOptions, timeout } = this.prepareOptions(options, METHODS.POST);
    return this.request(url, httpOptions, timeout);
  },
  put(url, options) {
    const { httpOptions, timeout } = this.prepareOptions(options, METHODS.PUT);
    return this.request(url, httpOptions, timeout);
  },
  delete(url, options) {
    const { httpOptions, timeout } = this.prepareOptions(options, METHODS.DELETE);
    return this.request(url, httpOptions, timeout);
  },

  prepareOptions(options, method) {
    const data = queryStringify(options.data || {});
    const httpOptions = { ...options, method, data };
    const timeout = options.timeout || undefined;
    return { httpOptions, timeout };
  },

  request(url, options, timeout = 5000) {
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
  },
};

export default HTTPTransport;
