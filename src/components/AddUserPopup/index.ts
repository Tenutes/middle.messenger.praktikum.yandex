import Block from '../../common/Block/Block';
import SearchResult, { SearchResultProps } from '../../components/SearchResult';
import { debounce } from '../../common/helpers';
import UserController from '../../controllers/UserController';
import { UserData } from '../../api/AuthAPI';

interface PopupProps {
  show: boolean;
  onAddUsers: ([]) => void;
  onClose?: () => void;
}

export default class AddUserPopup extends Block {
  constructor(props: PopupProps) {
    super(props);
  }

  componentShouldUpdate(o: PopupProps, n: PopupProps) {
    return o.show !== n.show;
  }

  getStateFromProps() {
    return {
      input: {
        id: 'add-user',
        type: 'search',
        name: 'search',
        label: 'Логин',
        classes: 'border-b border-blue w-full pt-4 text-base text-black',
        onInput: debounce(
          async (e: Event) => {
            const searchString = (e.target as HTMLInputElement).value;
            const users = await UserController.searchUsers({ login: searchString });
            (this.refs.searchResult as SearchResult).setProps({
              result: users?.map(user => ({
                ...user,
                active: false,
              })),
            });
          },
          { wait: 250 }
        ),
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
      onAddClick: () => {
        const searchResult = this.refs.searchResult as SearchResult;
        const props = searchResult.props as SearchResultProps;
        (this.props as PopupProps).onAddUsers(props.result.filter(({ active }) => active).map(({ id }) => id));
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
                        <p class="text-center mb-5">Добавить пользователя</p>
                        {{{ InputGroup ref='group' input=input label='Логин' classes='relative mb-5' }}}
                        {{{ SearchResult onUserClick=onClick ref='searchResult'}}}
                        {{{ Button classes="mt-3 w-full text-center bg-blue text-white text-sm font-medium rounded-4 px-4 py-2 duration-200 hover:opacity-80 focus:bg-blue-dark active:bg-blue-dark"
                                   label='Добавить пользователя(ей)' onClick=onAddClick}}}
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}
