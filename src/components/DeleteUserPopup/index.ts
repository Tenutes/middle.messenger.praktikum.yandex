import Block from '../../common/Block/Block';
import SearchResult, { SearchResultProps } from 'components/SearchResult';
import { UserData } from '../../api/AuthAPI';
import MessengerController from '../../controllers/MessengerController';

interface PopupProps {
  chatId: number;
  currentUserId: number;
  show: boolean;
  onClose?: () => void;
  onDeleteUsers: ([]) => void;
}

interface PopupState {
  loadUsers: () => Promise<UserData[]>;
  setCurrentUsers: () => Promise<void>;
}

export default class DeleteUserPopup extends Block {
  constructor(props: PopupProps) {
    super(props);
  }

  componentShouldUpdate(o: PopupProps, n: PopupProps) {
    return o.show !== n.show;
  }

  async componentDidMount() {
    await (this.state as PopupState).setCurrentUsers();
  }

  async componentDidUpdate() {
    await (this.state as PopupState).setCurrentUsers();
  }

  getStateFromProps() {
    return {
      loadUsers: async () => {
        const props = this.props as PopupProps;
        const currentChatUsers = await MessengerController.getChatUsers({ chatId: props.chatId });
        return currentChatUsers?.filter(({ id }) => id !== props.currentUserId);
      },
      setCurrentUsers: async () => {
        const currentUsers = await (this.state as PopupState).loadUsers();
        const searchResult = this.refs.searchResult as SearchResult;
        const newUsers = currentUsers?.map(user => ({
          ...user,
          active: false,
        }));
        this.setProps({ users: newUsers });
        searchResult.setProps({ result: newUsers });
      },
      onClick: (_e: Event, user: UserData & { active: boolean }) => {
        const searchResult = this.refs.searchResult as SearchResult;
        const currentUsers = (searchResult.props as SearchResultProps).result;
        const newUsers = currentUsers.map(currentUser => {
          const match = currentUser.id === user.id;
          const active = (currentUser as UserData & { active: boolean }).active;
          return {
            ...currentUser,
            active: active !== match,
          };
        });
        searchResult.setProps({ result: newUsers });
      },
      onPopupClick: (e: Event) => {
        if (e.target === this.element) {
          const props = this.props as PopupProps;
          if (typeof props?.onClose === 'function') {
            props.onClose();
          }
        }
      },
      onDeleteClick: async () => {
        const searchResult = this.refs.searchResult as SearchResult;
        const props = searchResult.props as SearchResultProps;
        await (this.props as PopupProps).onDeleteUsers(props.result.filter(({ active }) => active).map(({ id }) => id));
        await (this.state as PopupState).setCurrentUsers();
      },
    };
  }

  render() {
    // language=hbs
    return `
        <div class="fixed z-20 w-full inset-0 flex justify-center items-center duration-200{{#unless show }} invisible opacity-0{{/unless}}">
            <div class="absolute inset-0 bg-blue-light opacity-80 pointer-events-none"></div>
            <div class="w-full overflow-y-auto px-3 py-7 relative flex justify-center items-start relative max-h-full">
                <div class="w-[340px] h-full px-6 py-7 rounded-12 shadow-sm bg-white relative">
                    {{{ Button onClick=onClose pre_icon="cross" classes="absolute right-2 top-2 w-3 h-3 flex justify-center items-center rounded-full text-black hover:text-blue cursor-pointer" }}}
                    <div class="w-full">
                        <p class="text-center mb-5">Удалить пользователя(ей)</p>
                        {{{ SearchResult onUserClick=onClick result=users ref='searchResult'}}}
                        {{{ Button classes="mt-3 w-full text-center bg-blue text-white text-sm font-medium rounded-4 px-4 py-2 duration-200 hover:opacity-80 focus:bg-blue-dark active:bg-blue-dark"
                                   label='Удалить выбранные' onClick=onDeleteClick}}}
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}
