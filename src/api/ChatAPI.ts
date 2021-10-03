import BaseAPI from './BaseAPI';

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  read: undefined;
  update: undefined;
  delete: undefined;
  create: undefined;
}
