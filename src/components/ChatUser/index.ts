import Block from '../../common/Block/Block';

interface ChatUserProps {}

export default class ChatUser extends Block {
  constructor({ ...props }: ChatUserProps) {
    super({ ...props });
  }

  render(): string {
    // language=hbs
    return `
        <div class="mb-[2px] last:mb-0 user-chat" data-chat="{{id}}">
            <div class="mx-2 mb-[2px] h-[1px] bg-blue-light-hover"></div>
            <div class="py-[2px] user-chat__inner cursor-pointer">
                <div class="py-[12px] px-2 hover:bg-blue-light-hover duration-200 w-full relative">
                    <button
                            class="absolute top-[2px] right-[2px] w-2 h-2 duration-200 hover:text-blue opacity-0"
                            data-chat-delete="{{id}}"
                    >
                        <svg class="w-full h-full block">
                            <use href="/img/svg/sprite.svg#cross"></use>
                        </svg>
                    </button>
                    <div class="user-chat__decoration-top absolute w-2 h-2 right-0 bottom-full bg-blue-light-hover opacity-0 duration-200"></div>
                    <div class="user-chat__decoration-bottom absolute w-2 h-2 right-0 top-full bg-blue-light-hover opacity-0 duration-200"></div>
                    <div class="relative flex w-full">
                        <div class="w-10 h-10 flex-shrink-0 rounded-full bg-icon overflow-hidden mr-[7px]">
                            <img
                                    class="block w-full h-full object-cover"
                                    src="{{user.profile_image}}"
                                    alt="{{user.name}}"
                            >
                        </div>
                        <div class="flex-grow">
                            <div class="w-full max-w-[calc(100%-55px)]">
                                <p class="font-bold text-[13px] leading-[20px] whitespace-nowrap max-w-full overflow-ellipsis overflow-hidden">{{user.name}}</p>
                                {{#if last_message}}
                                    <div
                                            class="text-xs mt-[4px] text-gray leading-[12px] mt-4px h-[24px] overflow-hidden"
                                            data-chat-message
                                    >
                                        <p class="text-xs leading-[12px]">
                                            {{#if (self_message last_message.type)}}
                                                <span class="font-medium text-black">Вы: </span>
                                            {{/if}}
                                            {{last_message.message}}
                                        </p>
                                    </div>
                                {{/if}}
                            </div>
                        </div>
                        <div class="flex-shrink-0 flex flex-col items-end justify-between w-10 absolute top-0 right-0 h-full">
                            {{#if last_message}}
                                <p class="text-[9px] text-gray leading-[20px]">{{last_message.time}}</p>
                            {{/if}}
                            {{#if (ismorezero unread_count)}}
                                <p class="w-4 h-4 flex items-center justify-center text-white bg-blue text-[11px] font-medium rounded-full">{{unread_count}}</p>
                            {{/if}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}
