import Block from '../../common/Block/Block';
import { UserData } from '../../api/AuthAPI';

type onClick = (e: Event, user: UserData) => void;

interface ChatFoundUserProps {
  user: UserData;
  onClick?: onClick;
  events?: {
    click?: (e: Event) => void;
  };
}

export default class ChatFoundUser extends Block<ChatFoundUserProps> {
  constructor({ onClick, ...props }: ChatFoundUserProps) {
    super({ ...props, events: { click: (e: Event) => onClick?.(e, props.user) } });
  }

  static getName() {
    return 'ChatFoundUser';
  }

  render() {
    // language=hbs
    return `
        <div class="mb-[2px] last:mb-0 user-chat">
            <div class="mx-2 mb-[2px] h-[1px] bg-blue-light-hover"></div>
            <div class="py-[2px] user-chat__inner cursor-pointer">
                <div class="py-[12px] px-2 hover:bg-blue-light-hover duration-200 w-full relative{{#if user.active}} bg-blue-light-hover{{/if}}">
                    <button class="absolute top-[2px] right-[2px] w-2 h-2 duration-200 hover:text-blue opacity-0">
                        <svg class="w-full h-full block">
                            <use href="/static/img/svg/sprite.svg#cross"></use>
                        </svg>
                    </button>
                    {{#unless hideOpts}}
                        <div class="user-chat__decoration-top absolute w-2 h-2 right-0 bottom-full bg-blue-light-hover opacity-0 duration-200"></div>
                        <div class="user-chat__decoration-bottom absolute w-2 h-2 right-0 top-full bg-blue-light-hover opacity-0 duration-200"></div>
                    {{/unless}}
                    <div class="relative flex w-full">
                        <div class="w-10 h-10 flex-shrink-0 rounded-full bg-icon overflow-hidden mr-[7px]">
                            <img
                                    class="block w-full h-full object-cover"
                                {{#if user.avatar}}
                                    src="https://ya-praktikum.tech/api/v2/resources{{user.avatar}}"
                                {{else}}
                                    src="/static/img/empty-image.svg"
                                {{/if}}
                                    alt="{{user.first_name}}"
                            >
                        </div>
                        <div class="flex-grow flex flex-col justify-center">
                            <div class="w-full max-w-[calc(100%-55px)]">
                                <p class="font-bold text-[13px] leading-[20px] whitespace-nowrap max-w-full overflow-ellipsis overflow-hidden">{{user.first_name}}</p>

                                {{#unless hideMessage}}
                                    <div class="mt-[4px] text-gray leading-[12px] mt-4px h-[24px] overflow-hidden flex-grow">
                                        <p class="text-xs leading-[12px]">Начать общение</p>
                                    </div>
                                {{/unless}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}
