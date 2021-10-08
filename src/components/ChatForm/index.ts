import Block from '../../common/Block/Block';

interface ChatFormProps {
  onMessageSend: (message: string) => void;
  onSubmit: (e: Event) => void;
}

export default class ChatForm extends Block {
  constructor(props: ChatFormProps) {
    super(props);
  }

  getStateFromProps() {
    return {
      onSubmit: async (e: Event) => {
        e.preventDefault();
        const message = (this.refs.message as HTMLTextAreaElement).value;
        if (message) {
          (this.props as ChatFormProps).onMessageSend(message);
          (this.refs.message as HTMLTextAreaElement).value = '';
        }
      },
    };
  }

  componentDidMount() {
    this.element!.addEventListener('submit', (this.props as ChatFormProps).onSubmit);
  }

  componentShouldUpdate() {
    return true;
  }

  render() {
    // language=hbs
    return `
        <form
                id="chat-form"
                novalidate
                class="chat-form px-4 py-2 flex justify-between items-center border-t border-gray-light"
        >
            {{#if false}}
                <div class="relative flex-shrink-0 mr-2 flex items-center">
                    <div class="chat-form__append cursor-pointer duration-200 text-blue w-[32px] h-[32px]">
                        <svg class="w-full h-full block">
                            <use href="/img/svg/sprite.svg#append"></use>
                        </svg>
                    </div>
                    <div class="chat-form__append-list absolute bottom-full left-0 pb-[4px] w-[160px] opacity-0 invisible">
                        <div class="rounded-12 shadow-sm bg-white py-2 px-1">
                            <button
                                    data-chat-form-append="photo"
                                    class="p-1 rounded-6 duration-200 flex items-center text-blue font-medium text-xs cursor-pointer w-full hover:bg-blue-light-hover"
                            >
                                <svg class="w-[22px] h-[22px] block mr-3">
                                    <use href="/img/svg/sprite.svg#append-photo"></use>
                                </svg>
                                <span>Фото или Видео</span>
                            </button>
                            <button
                                    data-chat-form-append="file"
                                    class="p-1 rounded-6 duration-200 flex items-center text-blue font-medium text-xs cursor-pointer w-full hover:bg-blue-light-hover"
                            >
                                <svg class="w-[22px] h-[22px] block mr-3">
                                    <use href="/img/svg/sprite.svg#append-file"></use>
                                </svg>
                                <span>Файл</span>
                            </button>
                            <button
                                    data-chat-form-append="location"
                                    class="p-1 rounded-6 duration-200 flex items-center text-blue font-medium text-xs cursor-pointer w-full hover:bg-blue-light-hover"
                            >
                                <svg class="w-[22px] h-[22px] block mr-3">
                                    <use href="/img/svg/sprite.svg#append-location"></use>
                                </svg>
                                <span>Локацию</span>
                            </button>
                        </div>
                    </div>
                </div>
            {{/if}}
            <textarea
                    data-ref="message"
                    name="message"
                    class="flex-grow border-0 rounded-10 bg-gray-light placeholder:text-gray text-black px-4 py-2 leading-none text-sm"
                    placeholder="Сообщение"
                    rows="1"
                    required
            ></textarea>
            {{{ Button onClick=onSubmit classes="cursor-pointer duration-200 flex-shrink-0 text-blue w-[32px] h-[32px] ml-2"
                       pre_icon='send' }}}
        </form>
    `;
  }
}
