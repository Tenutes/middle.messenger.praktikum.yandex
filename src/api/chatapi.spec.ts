/**
 * @jest-environment jsdom
 */
import { ChatAPI } from './ChatAPI';
import sinon from 'sinon';

describe('Auth API', () => {
  let api: ChatAPI;
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    api = new ChatAPI();
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

  it('should send Get /chats/ on read', () => {
    api.read();

    expect(requests.length).toEqual(1);
    expect(requests[0].method).toEqual('Get');
    expect(requests[0].requestBody).toBeUndefined();
    expect(requests[0].url).toEqual('https://ya-praktikum.tech/api/v2/chats/');
  });

  it('should send POST /chats on create', () => {
    const data = {
      title: 'test chat',
    };

    api.create(data);

    expect(requests.length).toEqual(1);
    expect(requests[0].method).toEqual('Post');
    expect(requests[0].requestBody).toEqual(JSON.stringify(data));
    expect(requests[0].url).toEqual('https://ya-praktikum.tech/api/v2/chats');
  });

  it('should send PUT /chats/users on update', () => {
    const data = {
      chatId: 2,
      users: [2],
    };

    api.update(data);

    expect(requests.length).toEqual(1);
    expect(requests[0].method).toEqual('Put');
    expect(requests[0].requestBody).toEqual(JSON.stringify(data));
    expect(requests[0].url).toEqual('https://ya-praktikum.tech/api/v2/chats/users');
  });

  it('should send DELETE /chats on delete', () => {
    const data = {
      chatId: 2,
    };

    api.delete(data);

    expect(requests.length).toEqual(1);
    expect(requests[0].method).toEqual('Delete');
    expect(requests[0].requestBody).toEqual(JSON.stringify(data));
    expect(requests[0].url).toEqual('https://ya-praktikum.tech/api/v2/chats');
  });

  it('should send POST /chats/token/:chatId on token', () => {
    const data = {
      chatId: 2,
    };

    api.token(data);

    expect(requests.length).toEqual(1);
    expect(requests[0].method).toEqual('Post');
    expect(requests[0].requestBody).toBeUndefined();
    expect(requests[0].url).toEqual('https://ya-praktikum.tech/api/v2/chats/token/' + data.chatId);
  });

  it('should send GET /chats/users on users', () => {
    const data = {
      chatId: 2,
    };

    api.users(data);

    expect(requests.length).toEqual(1);
    expect(requests[0].method).toEqual('Get');
    expect(requests[0].requestBody).toBeUndefined();
    expect(requests[0].url).toEqual(`https://ya-praktikum.tech/api/v2/chats/${data.chatId}/users`);
  });

  it('should send DELETE /chats/users on deleteUsers', () => {
    const data = {
      chatId: 2,
      users: [2],
    };

    api.deleteUsers(data);

    expect(requests.length).toEqual(1);
    expect(requests[0].method).toEqual('Delete');
    expect(requests[0].requestBody).toEqual(JSON.stringify(data));
    expect(requests[0].url).toEqual('https://ya-praktikum.tech/api/v2/chats/users');
  });
});
