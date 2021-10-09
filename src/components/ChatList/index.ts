import Block from '../../common/Block/Block';
import { UserData } from '../../api/AuthAPI';
import MessengerController from '../../controllers/MessengerController';
import { IChat } from 'components/Chat';

interface ChatListProps {
  user: UserData;
  chats: [];
  search: [];
  onFoundChatCLick: (e: Event, user: UserData) => void;
  onChatChoose: (userId: number, chat: IChat, token: string) => void;
  onChatClick: (e: Event, chat: IChat) => void;
  onChatDelete: (e: Event, chatId: number) => void;
}

export default class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super(props);
  }

  static getName() {
    return 'ChatList';
  }

  getStateFromProps() {
    return {
      onFoundChatCLick: async (event: Event, user: UserData) => {
        event.preventDefault();
        const createChatData = { title: `${user.first_name} ${user.second_name}` };
        const chatId = await MessengerController.createChat(createChatData);
        if (chatId) {
          const addUsersData = {
            chatId: chatId,
            users: [user.id],
          };
          await MessengerController.addUsersToChat(addUsersData);
        }
      },
      onChatClick: async (event: Event, chat: IChat) => {
        event.preventDefault();

        const response = await MessengerController.getToken({ chatId: chat.id });
        if (response?.token) {
          this.props.onChatChoose(this.props.user.id, chat, response.token);
        }
      },
      onChatDelete: async (event: Event, chatId: number) => {
        event.preventDefault();
        const deleteChatData = { chatId };
        await MessengerController.deleteChat(deleteChatData);
      },
    };
  }

  componentShouldUpdate() {
    return true;
  }

  render() {
    // language=hbs
    return `
        <div>
            {{#each chats}}
                {{{ChatUser chat=this user=../user onChatClick=../onChatClick onChatDelete=../onChatDelete}}}
            {{/each}}
            {{#if (non_zero_length search)}}
                <p class="px-3 py-2">Найденные пользователи:</p>
                {{#each search}}
                    {{{ ChatFoundUser user=this onClick=../onFoundChatCLick}}}
                {{/each}}
            {{/if}}
        </div>`;
  }
}
