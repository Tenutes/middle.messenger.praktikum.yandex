import Block from '../../common/Block/Block';

interface ChatMessageProps {
  type: string;
  status: string;
  date: string;
  message: string;
}

export default class ChatMessage extends Block {
  constructor({ ...props }: ChatMessageProps) {
    super({ ...props });
  }

  render(): string {
    // language=hbs
    return `
        <div class="max-w-[45%] relative min-w-[115px] p-2 rounded-12 text-sm mb-3 {{#if (self_message type)}}align-self-end bg-icon rounded-b-r-0{{else}}bg-silver-light{{/if}}">
            {{message}} <span class="inline-block vertical-middle w-13"></span>
            <p class="absolute bottom-2 right-2 text-[9px] {{#if (self_message type)}}text-blue{{else}}text-gray{{/if}} leading-none">
                {{#if (self_message type)}}
                    {{#if (message_sended status)}}
                        <span class="inline-block text-gray w-[11px] h-1">
                        <svg class="w-full h-full block">
                          <use href="/img/svg/sprite.svg#message-one-mark"></use>
                        </svg>
                      </span>
                    {{else if (message_recieved status) }}
                        <span class="inline-block text-gray w-[11px] h-1">
                          <svg class="w-full h-full block">
                            <use href="/img/svg/sprite.svg#message-two-marks"></use>
                          </svg>
                        </span>
                    {{else if (message_readed status) }}
                        <span class="inline-block text-blue w-[11px] h-1">
                          <svg class="w-full h-full block">
                            <use href="/img/svg/sprite.svg#message-two-marks"></use>
                          </svg>
                        </span>
                    {{/if}}
                {{/if}}
                {{date}}
            </p>
        </div>
    `;
  }
}
