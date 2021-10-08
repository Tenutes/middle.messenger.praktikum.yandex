import {
  AddUsersData,
  ChatAPI,
  ChatMessage,
  ChatTokenData,
  ChatTokenResponse,
  ChatUsersData,
  CreateChatData,
  DeleteChatData,
} from '../api/ChatAPI';
import { store } from '../store';
import { addChat, deleteChat, setChats, addMessage, setChat } from '../store/messenger';
import { isArray } from '../common/helpers';
import { IChat } from 'components/Chat';
import { UserData } from 'api/AuthAPI.js';

class MessengerController {
  private api: ChatAPI;

  constructor() {
    this.api = new ChatAPI();
  }

  async getChatList() {
    try {
      const chats = await this.api.read();
      store.dispatch(setChats(chats as []));
    } catch (e) {
      console.log(e);
    }
  }

  async createChat(data: CreateChatData): Promise<number | undefined> {
    try {
      const { id } = await this.api.create(data);
      const newChat = { id, title: data.title };
      store.dispatch(addChat(newChat));
      return id;
    } catch (e) {
      console.log(e);
    }
  }

  async addUsersToChat(data: AddUsersData) {
    try {
      await this.api.update(data);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteUsersFromChat(data: AddUsersData) {
    try {
      return this.api.deleteUsers(data);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteChat(data: DeleteChatData) {
    try {
      await this.api.delete(data);
      store.dispatch(deleteChat(data.chatId));
    } catch (e) {
      console.log(e);
    }
  }

  async getToken(data: ChatTokenData): Promise<ChatTokenResponse | undefined> {
    try {
      return this.api.token(data);
    } catch (e) {
      console.log(e);
    }
  }

  async getChatUsers(data: ChatUsersData): Promise<UserData[] | undefined> {
    try {
      return this.api.users(data);
    } catch (e) {
      console.log(e);
    }
  }

  setChat(chat: IChat) {
    store.dispatch(setChat(chat));
  }

  addMessage(message: ChatMessage | ChatMessage[]) {
    if (isArray(message)) {
      for (let i = message.length - 1; i >= 0; i--) {
        store.dispatch(addMessage(message[i]));
      }
    } else {
      store.dispatch(addMessage(message as ChatMessage));
    }
  }
}

export default new MessengerController();
