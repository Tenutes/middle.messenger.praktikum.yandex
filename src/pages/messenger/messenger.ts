import Block from '../../common/Block/Block';
import MessengerController from '../../controllers/MessengerController';
import { MessengerState } from '../../store/messenger';
import ChatList from '../../components/ChatList';
import Chat, { IChat } from '../../components/Chat';
import ChatWS, { MessageResponse } from '../../api/ChatWS';
import { isArray } from '../../common/helpers';

interface MessengerProps {
  user: {};
  onChatChoose: (userId: number, chat: IChat, toke: string) => void;
  onMessageSend: (message: string) => void;
}

interface MessengerRefs {
  chat: Chat;
  chatList: ChatList;
}

export class MessengerPage extends Block<MessengerProps, MessengerRefs> {
  private ws: ChatWS | null;

  constructor(props: MessengerProps) {
    super(props);
    this.ws = null;
  }

  getStateFromProps() {
    const onMessage = (response: MessageResponse) => {
      MessengerController.addMessage(response.content);
      const totalMessages = isArray(response.content) ? response.content.length : 1;
      this.ws?.increaseOffsetBy(totalMessages);
    };

    return {
      onChatChoose: (userId: number, chat: IChat, token: string) => {
        MessengerController.setChat(chat);
        if (!this.ws) {
          this.ws = new ChatWS();
        }

        this.ws.shutdown();
        const path = `/${userId}/${chat.id}/${token}`;
        this.ws.setup(path, onMessage);
      },
      onMessageSend: (message: string) => {
        this.ws?.sendMessage(message);
      },
    };
  }

  componentShouldUpdate(_: MessengerState & MessengerProps, { chats, search, chat }: MessengerState & MessengerProps) {
    if (chat) {
      this.refs.chat.setProps({ chat });
    }
    this.refs.chatList.setProps({ chats, search });
    return false;
  }

  async componentDidMount() {
    this.ws = new ChatWS();
    await MessengerController.getChatList();
  }

  render() {
    // language=hbs
    return `
        <div class="flex h-screen">
            <div class="w-[310px] flex-shrink-0 bg-blue-light border-r border-gray-light pt-4 flex flex-col">
                <div class="mb-3">
                    <div class="px-2 text-right mb-4 flex justify-between items-center">
                        {{#if user.display_name}}
                            <p>{{user.display_name}}</p>
                        {{else}}
                            <p>{{user.first_name}}</p>
                        {{/if}}
                        {{{ Link to='/settings' label='Профиль' classes='inline-block decoration-none text-base text-gray hover:text-blue duration-200 arrowed'}}}
                    </div>
                    {{{ Search input=input}}}
                </div>
                <div class="flex-1-1-auto overflow-hidden">
                    <div class="w-full h-full overflow-y-auto no-scrollbar">
                        {{{ ChatList ref='chatList' user=user chats=chats search=search onChatChoose=onChatChoose}}}
                    </div>
                </div>
            </div>
            <div class="flex-grow" data-chat-container>
                {{{ Chat ref='chat' user=user chat=chat onMessageSend=onMessageSend }}}
            </div>
        </div>
    `;
  }
}
