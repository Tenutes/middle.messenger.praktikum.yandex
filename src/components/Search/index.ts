import Block from '../../common/Block/Block';
import { InputProps } from '../Input';

interface SearchProps {
  input: InputProps;
}

export default class Search extends Block {
  constructor({ ...props }: SearchProps) {
    super({ ...props });
  }

  render(): string {
    // language=hbs
    return `
        <div class="px-2">
            <div class="relative">
                {{{ Input id=input.id type=input.type name=input.name required=input.required label=input.label
                          classes=input.classes}}}
                <label
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
