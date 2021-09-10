interface HTTPOptions {
  timeout?: number | null;
  headers?: StringRecord;
  data: Record<string, unknown> | null;
}

interface HTTPRequestOptions {
  method: METHODS;
  timeout?: number | null;
  headers?: StringRecord;
  data: string | null;
}

interface IHTTPTransport {
  get(url: string, options: HTTPOptions);

  post(url: string, options: HTTPOptions);

  put(url: string, options: HTTPOptions);

  delete(url: string, options: HTTPOptions);

  prepareOptions(
    options: HTTPOptions,
    method: METHODS
  ): { httpOptions: HTTPRequestOptions; timeout: number | undefined };

  request(url: string, options: HTTPRequestOptions, timeout: number = 5000);
}
