/**
 * @jest-environment jsdom
 */
import { UserAPI } from './UserAPI';
import sinon from 'sinon';

describe('Auth API', () => {
  let api: UserAPI;
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    api = new UserAPI();
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

  it('should send PUT /user/profile on update', () => {
    const data = {
      email: '',
      first_name: '',
      login: '',
      password: '',
      phone: '',
      second_name: '',
      display_name: '',
    };

    api.update(data);

    expect(requests.length).toEqual(1);
    expect(requests[0].method).toEqual('Put');
    expect(requests[0].requestBody).toEqual(JSON.stringify(data));
    expect(requests[0].url).toEqual('https://ya-praktikum.tech/api/v2/user/profile');
  });

  it('should send PUT /user/profile/avatar on updateAvatar', () => {
    const data = new FormData();
    data.append('avatar', new File([''], 'test'));

    api.updateAvatar(data);

    expect(requests.length).toEqual(1);
    expect(requests[0].method).toEqual('Put');
    expect(requests[0].requestBody).toEqual(data);
    expect(requests[0].url).toEqual('https://ya-praktikum.tech/api/v2/user/profile/avatar');
  });

  it('should send PUT /user/password on changePassword', () => {
    const data = {
      oldPassword: 'test',
      newPassword: 'newPassword',
    };

    api.changePassword(data);

    expect(requests.length).toEqual(1);
    expect(requests[0].method).toEqual('Put');
    expect(requests[0].requestBody).toEqual(JSON.stringify(data));
    expect(requests[0].url).toEqual('https://ya-praktikum.tech/api/v2/user/password');
  });

  it('should send POST /user/search on search', () => {
    const data = {
      login: 'test',
    };

    api.search(data);

    expect(requests.length).toEqual(1);
    expect(requests[0].method).toEqual('Post');
    expect(requests[0].requestBody).toEqual(JSON.stringify(data));
    expect(requests[0].url).toEqual('https://ya-praktikum.tech/api/v2/user/search');
  });
});
