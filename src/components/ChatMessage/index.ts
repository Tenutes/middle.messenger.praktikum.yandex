import Block from '../../common/Block/Block';
import { UserData } from 'api/AuthAPI.js';

interface ChatMessageProps {
  user: UserData;
  message: ChatMessage;
}

export default class ChatMessage extends Block {
  constructor(props: ChatMessageProps) {
    super(props);
  }

  render() {
    // language=hbs
    return `
        <div class="max-w-[45%] relative min-w-[115px] p-2 rounded-12 text-sm mb-3 {{#if (self_message user.id message.user_id)}}align-self-end bg-icon rounded-b-r-0{{else}}bg-silver-light{{/if}}">
            {{message.content}}
            <span class="inline-block vertical-middle w-13"></span>
            <p class="absolute bottom-2 right-2 text-[9px] {{#if (self_message user.id message.user_id)}}text-blue{{else}}text-gray{{/if}} leading-none">
                {{#if (self_message user.id message.user_id)}}
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
                {{convert_message_date message.time}}
            </p>
        </div>
    `;
  }
}
