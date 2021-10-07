import Block from '../../common/Block/Block';
import { UserData } from '../../api/AuthAPI';
import { CreateChatData } from '../../api/ChatAPI';
import MessengerController from '../../controllers/MessengerController';
import { IChat } from 'components/Chat';

interface ChatListProps {
  user: UserData;
  chats: [];
  search: [];
  onChatChoose: (userId: number, chat: IChat, token: string) => void;
}

export default class ChatList extends Block {
  constructor(props: ChatListProps) {
    super(props);
  }

  getStateFromProps() {
    return {
      onFoundChatCLick: async (event: Event, user: UserData) => {
        event.preventDefault();
        const createChatData: CreateChatData = { title: `${user.first_name} ${user.second_name}` };
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
          (this.props as ChatListProps).onChatChoose((this.props as ChatListProps).user.id, chat, response.token);
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
