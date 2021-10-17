import Block from '../../common/Block/Block';
import { IChat } from '../../components/Chat';

type onChatClick = (e: Event, chat: IChat) => void;

interface ChatUserProps {
  chat: IChat;
  onChatDelete: (e: Event, id: number) => void;
  onChatClick?: onChatClick;
  onDelete: (e: Event) => void;
  events?: { click: (e: Event) => void };
}

export default class ChatUser extends Block<ChatUserProps> {
  constructor({ onChatClick, ...props }: ChatUserProps) {
    super({ ...props, events: { click: (e: Event) => onChatClick?.(e, props.chat) } });
  }

  static getName() {
    return 'ChatUser';
  }

  getStateFromProps() {
    return {
      onDelete: (e: Event) => {
        e.stopPropagation();
        this.props.onChatDelete(e, this.props.chat.id);
      },
    };
  }

  render() {
    // language=hbs
    return `
        <div class="mb-[2px] last:mb-0 user-chat">
            <div class="mx-2 mb-[2px] h-[1px] bg-blue-light-hover"></div>
            <div class="py-[2px] user-chat__inner cursor-pointer">
                <div class="py-[12px] px-2 hover:bg-blue-light-hover duration-200 w-full relative">
                    {{{ Button pre_icon='cross' extra='data-chat-delete' onClick=onDelete classes='absolute top-[2px] right-[2px] w-2 h-2 duration-200 hover:text-blue opacity-0'}}}
                    <div class="user-chat__decoration-top absolute w-2 h-2 right-0 bottom-full bg-blue-light-hover opacity-0 duration-200"></div>
                    <div class="user-chat__decoration-bottom absolute w-2 h-2 right-0 top-full bg-blue-light-hover opacity-0 duration-200"></div>
                    <div class="relative flex w-full">
                        <div class="w-10 h-10 flex-shrink-0 rounded-full bg-icon overflow-hidden mr-[7px]">
                            <img
                                    class="block w-full h-full object-cover"
                                {{#if chat.avatar}}
                                    src="https://ya-praktikum.tech/api/v2/resources{{chat.avatar}}"
                                {{else}}
                                    src="/static/img/empty-image.svg"
                                {{/if}}
                                    alt="{{chat.title}}"
                            >
                        </div>
                        <div class="flex-grow">
                            <div class="w-full max-w-[calc(100%-55px)]">
                                <p class="font-bold text-[13px] leading-[20px] whitespace-nowrap max-w-full overflow-ellipsis overflow-hidden">{{chat.title}}</p>

                                <div class="text-xs mt-[4px] text-gray leading-[12px] mt-4px h-[24px] overflow-hidden">
                                    <p class="text-xs leading-[12px]">
                                        {{#if chat.last_message}}
                                            {{#if (self_message chat.last_message.user.login user.login)}}
                                                <span class="font-medium text-black">Вы: </span>
                                            {{/if}}
                                            {{chat.last_message.content}}
                                        {{else}}
                                            Пока нет сообщений
                                        {{/if}}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="flex-shrink-0 flex flex-col items-end justify-between w-10 absolute top-0 right-0 h-full">
                            {{#if chat.last_message}}
                                <p class="text-[9px] text-gray leading-[20px]">{{convert_message_date chat.last_message.time}}</p>
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
