/**
 * @jest-environment jsdom
 */
import { AuthAPI } from './AuthAPI';
import sinon from 'sinon';

describe('Auth API', () => {
  let api: AuthAPI;
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    api = new AuthAPI();
    let xhr: sinon.SinonFakeXMLHttpRequestStatic;
    (global as any).XMLHttpRequest = xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = (request: sinon.SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };
  });

  afterEach(() => {
    (global as any).XMLHttpRequest.restore();

    requests.length = 0;
  });

  it('should send POST /auth/signup on signup', () => {
    const data = {
      email: '',
      first_name: '',
      login: '',
      password: '',
      phone: '',
      second_name: '',
    };

    api.signup(data);

    expect(requests.length).toEqual(1);
    expect(requests[0].method).toEqual('Post');
    expect(requests[0].requestBody).toEqual(JSON.stringify(data));
    expect(requests[0].url).toEqual('https://ya-praktikum.tech/api/v2/auth/signup');
  });

  it('should send POST /auth/signin on login', () => {
    const data = {
      email: '',
      first_name: '',
      login: '',
      password: '',
      phone: '',
      second_name: '',
    };

    api.login(data);

    expect(requests.length).toEqual(1);
    expect(requests[0].method).toEqual('Post');
    expect(requests[0].requestBody).toEqual(JSON.stringify(data));
    expect(requests[0].url).toEqual('https://ya-praktikum.tech/api/v2/auth/signin');
  });

  it('should send POST /auth/logout on logout', () => {
    api.logout();

    expect(requests.length).toEqual(1);
    expect(requests[0].method).toEqual('Post');
    expect(requests[0].requestBody).toBeUndefined();
    expect(requests[0].url).toEqual('https://ya-praktikum.tech/api/v2/auth/logout');
  });

  it('should send GET /auth/user on read', () => {
    api.read();

    expect(requests.length).toEqual(1);
    expect(requests[0].method).toEqual('Get');
    expect(requests[0].requestBody).toBeUndefined();
    expect(requests[0].url).toEqual('https://ya-praktikum.tech/api/v2/auth/user');
  });
});
