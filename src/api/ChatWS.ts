import WS from './WS';
import { ChatMessage } from '../api/ChatAPI';

export interface onMessageData {
  data: string;
}

export interface MessageResponse {
  type: string;
  content: ChatMessage | ChatMessage[];
}

export interface WSResponse {
  type: string;
  data: string;
}

export default class ChatWS extends WS {
  private offset: number;

  constructor() {
    super('/chats');
    this.offset = 0;
  }

  setup(path: string, onMessage: (d: MessageResponse) => void) {
    this.connect(path);
    this.rePing();
    this.addListener('message', wsResponse => {
      const { type, data } = wsResponse as unknown as WSResponse;
      const messageResponse: MessageResponse = {
        type,
        content: JSON.parse(data),
      };
      onMessage(messageResponse);
    });

    this.addListener('open', () => {
      this.getOldMessages();
    });
  }

  sendMessage(message: string) {
    this.send({ type: 'message', content: message });
  }

  shutdown() {
    super.shutdown();
    this.offset = 0;
  }

  getOldMessages() {
    this.send({ type: 'get old', content: `${this.offset}` });
  }

  increaseOffsetBy(by: number) {
    this.offset += by;
  }
}
