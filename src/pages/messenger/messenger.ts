import Block from '../../common/Block/Block';

export class MessengerPage extends Block {
  render() {
    // language=hbs
    return `
        <div class="flex h-screen">
            <div class="w-[310px] flex-shrink-0 bg-blue-light border-r border-gray-light pt-4 flex flex-col">
                <div class="mb-3">
                    <div class="px-2 text-right mb-4">
                        {{{ Link to='/settings' label='Профиль' classes='inline-block decoration-none text-base text-gray hover:text-blue duration-200 arrowed'}}}
                    </div>
                    {{{ Search input=input}}}
                </div>
                <div class="flex-1-1-auto overflow-hidden">
                    <div class="w-full h-full overflow-y-auto no-scrollbar" data-chat-list>
                        <div class="">
                            {{#each chats}}
                                {{{ this }}}
                            {{/each}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-grow" data-chat-container>
                <div class="flex w-full h-full items-center justify-center">
                    <p class="text-base text-gray font-medium">Выберите чат, чтобы отправить сообщение</p>
                </div>
            </div>
        </div>

    `;
  }
}
