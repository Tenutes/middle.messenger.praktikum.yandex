import Block from '../../common/Block/Block';
import Input, { InputProps } from '../Input';
import { debounce } from '../../common/helpers';
import UserController from '../../controllers/UserController';

interface SearchProps {
  input: InputProps;
}

export default class Search extends Block {
  constructor({ ...props }: SearchProps) {
    super({ ...props });
  }

  getStateFromProps() {
    return {
      onInput: debounce(
        async (e: Event) => {
          const searchString = (e.target as HTMLInputElement).value;
          await UserController.search({ login: searchString });
        },
        { wait: 250 }
      ),
      onFocus: () => {
        (this.refs.label as HTMLLabelElement).style.display = 'none';
      },
      onBlur: () => {
        if (!((this.refs.search as Input).element! as HTMLInputElement).value) {
          (this.refs.label as HTMLLabelElement).style.display = 'flex';
        }
      },
    };
  }

  render() {
    // language=hbs
    return `
        <div class="px-2">
            <div class="relative">
                {{{ Input onFocus=onFocus onBlur=onBlur onInput=onInput ref='search' id=input.id type=input.type
                          name=input.name required=input.required label=input.label classes=input.classes}}}
                <label
                        data-ref="label"
                        for="search"
                        class="flex items-center absolute top-1/2 left-1/2 transform-top-left-center text-gray text-base duration-200"
                >
                  <span class="w-4 h-4 mr-1">
                    <svg class="block w-full h-full">
                      <use href="/img/svg/sprite.svg#search"></use>
                    </svg>
                  </span>
                    <span>Поиск</span>
                </label>
            </div>
        </div>
    `;
  }
}
