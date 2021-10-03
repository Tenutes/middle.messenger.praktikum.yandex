import Block from '../../common/Block/Block';

interface ChatProps {}

export default class Chat extends Block {
  constructor({ ...props }: ChatProps) {
    super({ ...props });
  }

  render(): string {
    // language=hbs
    return `
        <div class="flex flex-col h-full">
            <div class="px-4 py-2 flex justify-between items-center border-b border-gray-light">
                <div class="flex items-center mr-2">
                    <div class="w-[34px] h-[34px] flex-shrink-0 mr-2 rounded-full overflow-hidden">
                        <img class="block w-full h-full bg-icon object-cover" src="{{chat.user.profile_image}}" alt="{{chat.user.name}}">
                    </div>
                    <p class="text-[13px] font-semibold leading-none">{{chat.user.name}}</p>
                </div>
                <div class="relative">
                    <button
                            data-chat-user-settings-button
                            class="flex w-4 h-4 items-center justify-center text-black hover:text-blue duration-200"
                    >
                        <svg class="block w-[3px] h-[16px]">
                            <use href="/img/svg/sprite.svg#dots"></use>
                        </svg>
                    </button>
                    <div
                            class="absolute w-[210px] top-[calc(100%+25px)] -right-2 rounded-12 shadow-sm bg-white py-2 px-1 opacity-0 invisible duration-200"
                            data-chat-user-settings
                    >
                        <button
                                data-chat-form-append="photo"
                                class="p-1 rounded-6 duration-200 flex items-center text-blue font-medium text-xs cursor-pointer w-full hover:bg-blue-light-hover mb-1 last:mb-0"
                        >
                            <svg class="w-[22px] h-[22px] block mr-3">
                                <use href="/img/svg/sprite.svg#chat-plus"></use>
                            </svg>
                            <span>Добавить пользователя</span>
                        </button>
                        <button
                                data-chat-form-append="photo"
                                class="p-1 rounded-6 duration-200 flex items-center text-blue font-medium text-xs cursor-pointer w-full hover:bg-blue-light-hover mb-1 last:mb-0"
                        >
                            <svg class="w-[22px] h-[22px] block mr-3 transform-rotate-45">
                                <use href="/img/svg/sprite.svg#chat-plus"></use>
                            </svg>
                            <span>Удалить пользователя</span>
                        </button>
                    </div>
                </div>
            </div>
            <div data-chat-inner class="flex-1-1-auto overflow-hidden">
                <div class="w-full h-full overflow-y-auto no-scrollbar" data-chat-inner-list>
                    <div class="flex flex-col justify-end min-h-full" data-chat-inner-list-container>
                        <div class="flex-1-1-auto min-h-[50px]"></div>
                        {{#each chat.messageGroups}}
                            <div class="px-4 flex flex-col items-start">
                                <p class="sticky mx-auto top-2 px-2 py-1 bg-white-80 text-center text-gray text-xs mb-3">{{this.date}}</p>
                                {{#each this.messages}}
                                    {{{ this }}}
                                {{/each}}
                            </div>
                        {{/each}}
                    </div>
                </div>
            </div>
            {{{ chatForm }}}
        </div>
    `;
  }
}
