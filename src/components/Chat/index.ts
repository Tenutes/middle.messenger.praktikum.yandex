import Block from '../../common/Block/Block';
import { UserData } from '../../api/AuthAPI';
import { ChatMessage } from '../../api/ChatAPI';
import isEqual from '../../utils/isEqual';
import MessengerController from '../../controllers/MessengerController';
import AddUserPopup from 'components/AddUserPopup';
import DeleteUserPopup from 'components/DeleteUserPopup';
import Button from 'components/Button';

export interface IChat {
  id: number;
  title: string;
  avatar?: string;
  unread_count?: number;
  last_message?: LastMessage;
  messages?: ChatMessage[];
}

interface LastMessage {
  user: UserData;
  time: string;
  content: string;
}

interface ChatProps {
  chat: IChat;
  toggleMenu: (e: Event) => void;
  addPopupShow: boolean;
  deletePopupShow: boolean;
  onAddPopupClose: () => void;
  onDeletePopupClose: () => void;
  showAddUserPopup: () => void;
  showDeleteUserPopup: () => void;
}

interface ChatRefs {
  add_popup: AddUserPopup;
  delete_popup: DeleteUserPopup;
  menuButton: Button;
  menu?: HTMLElement;
}

export default class Chat extends Block<ChatProps, ChatRefs> {
  constructor(props: ChatProps) {
    super(props);
  }

  static getName() {
    return 'Chat';
  }

  getStateFromProps() {
    return {
      addPopupShow: false,
      deletePopupShow: false,
      onAddPopupClose: () => {
        this.refs.add_popup.setProps({ show: false });
      },
      onDeletePopupClose: () => {
        this.refs.delete_popup.setProps({ show: false });
      },
      showAddUserPopup: () => {
        this.refs.add_popup.setProps({ show: true });
      },
      showDeleteUserPopup: () => {
        this.refs.delete_popup.setProps({ show: true });
      },
      addUsers: async (usersIds: number[]) => {
        if (usersIds.length) {
          await MessengerController.addUsersToChat({
            users: usersIds,
            chatId: this.props.chat.id,
          });

          this.state.onAddPopupClose?.();
        }
      },
      deleteUsers: async (usersIds: number[]) => {
        if (usersIds.length) {
          await MessengerController.deleteUsersFromChat({
            users: usersIds,
            chatId: this.props.chat.id,
          });

          this.state.onDeletePopupClose?.();
        }
      },
      toggleMenu: (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        this.refs.menuButton.element?.classList.toggle('active');
        const menu = this.refs.menu;
        menu?.classList.toggle('opacity-0');
        menu?.classList.toggle('invisible');
      },
    };
  }

  componentShouldUpdate(o: ChatProps, n: ChatProps) {
    return !isEqual(o, n);
  }

  render() {
    // language=hbs
    return `
        <div class="flex flex-col h-full">
            {{#if chat}}
                {{{ AddUserPopup ref='add_popup' show=addPopupShow onClose=onAddPopupClose onAddUsers=addUsers }}}
                {{{ DeleteUserPopup ref='delete_popup' chatId=chat.id currentUserId=user.id show=deletePopupShow
                                    onClose=onDeletePopupClose onDeleteUsers=deleteUsers }}}
                <div class="px-4 py-2 flex justify-between items-center border-b border-gray-light">
                    <div class="flex items-center mr-2">
                        <div class="w-[34px] h-[34px] flex-shrink-0 mr-2 rounded-full overflow-hidden">
                            <img
                                    class="block w-full h-full bg-icon object-cover"
                                {{#if chat.avatar}}
                                    src="https://ya-praktikum.tech/api/v2/resources{{chat.avatar}}"
                                {{else}}
                                    src="/img/empty-image.svg"
                                {{/if}}
                                    alt="{{chat.title}}"
                            >
                        </div>
                        <p class="text-[13px] font-semibold leading-none">{{chat.title}}</p>
                    </div>
                    <div class="relative">
                        {{{ Button ref='menuButton' onClick=toggleMenu classes="flex w-4 h-4 items-center justify-center text-black hover:text-blue duration-200"
                                   pre_icon='dots'}}}
                        <div
                                class="absolute w-[210px] top-[calc(100%+25px)] -right-2 rounded-12 shadow-sm bg-white py-2 px-1 opacity-0 invisible duration-200"
                                ref="menu"
                                data-chat-user-settings
                        >
                            {{{ Button onClick=showAddUserPopup label='Добавить пользователя' onClick=showAddUserPopup
                                       pre_icon='chat-plus'
                                       icon_classes="w-[22px] h-[22px] mr-3" classes='p-1 rounded-6 duration-200 flex items-center text-blue font-medium text-xs cursor-pointer w-full hover:bg-blue-light-hover mb-1 last:mb-0'}}}
                            {{{ Button onClick=showDeleteUserPopup label='Удалить пользователя' onClick=showDeleteUserPopup
                                       pre_icon='chat-plus'
                                       icon_classes="w-[22px] h-[22px] block mr-3 transform-rotate-45" classes='p-1 rounded-6 duration-200 flex items-center text-blue font-medium text-xs cursor-pointer w-full hover:bg-blue-light-hover mb-1 last:mb-0'}}}
                        </div>
                    </div>
                </div>
                <div data-chat-inner class="flex-1-1-auto overflow-hidden">
                    <div class="w-full h-full overflow-y-auto no-scrollbar" data-chat-inner-list>
                        <div class="flex flex-col justify-end min-h-full" data-chat-inner-list-container>
                            <div class="flex-1-1-auto min-h-[50px]"></div>
                            <div class="px-4 flex flex-col items-start">
                                {{#each chat.messages}}
                                    {{{ ChatMessage user=../user message=this }}}
                                {{/each}}
                            </div>
                        </div>
                    </div>
                </div>
                {{{ ChatForm onMessageSend=onMessageSend }}}
            {{else}}
                <div class="flex w-full h-full items-center justify-center px-5">
                    <p class="text-base text-gray font-medium">Выберите чат или создайте новый через поиск,
                        чтобы отправить сообщение</p>
                </div>
            {{/if}}
        </div>
    `;
  }
}
