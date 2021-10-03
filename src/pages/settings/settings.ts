import Block from '../../common/Block/Block';

export class SettingsPage extends Block {
  render() {
    // language=hbs
    return `
        <div class="w-full bg-white h-screen">
            {{{ Back to='/messenger' }}}
            <div class="h-full max-h-screen py-12">
                <div class="w-full max-w-[530px] px-3 flex flex-col items-center mx-auto">
                    <div class="mb-8 w-full flex flex-col items-center">
                        {{{ SettingsProfile name=user.profile.first_name }}}
                    </div>
                    <div class="w-full mb-10">
                        <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0">
                            <p class="text-sm text-black mr-2">Почта</p>
                            <p class="text-sm text-gray">{{user.profile.email}}</p>
                        </div>
                        <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0">
                            <p class="text-sm text-black mr-2">Логин</p>
                            <p class="text-sm text-gray">{{user.profile.login}}</p>
                        </div>
                        <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0">
                            <p class="text-sm text-black mr-2">Имя</p>
                            <p class="text-sm text-gray">{{user.profile.first_name}}</p>
                        </div>
                        <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0">
                            <p class="text-sm text-black mr-2">Фамилия</p>
                            <p class="text-sm text-gray">{{user.profile.second_name}}</p>
                        </div>
                        <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0">
                            <p class="text-sm text-black mr-2">Имя в чате</p>
                            <p class="text-sm text-gray">{{user.profile.display_name}}</p>
                        </div>
                        <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0">
                            <p class="text-sm text-black mr-2">Телефон</p>
                            <p class="text-sm text-gray">{{user.profile.phone}}</p>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0">
                            {{{ Link to='/settings/update' label='Изменить данные' classes='text-blue text-sm font-medium decoration-none hover:underline' }}}
                        </div>
                        <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0">
                            {{{ Link to='/settings/change-password' label='Изменить пароль' classes='text-blue text-sm font-medium decoration-none hover:underline' }}}
                        </div>
                        <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0">
                            {{{ Link to='/logout' label='Выйти' classes='text-red text-sm font-medium decoration-none hover:underline' }}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}
