import Block from '../../../common/Block/Block';

export class SettingsUpdatePage extends Block {
  protected getStateFromProps() {
    return {
      onRegister: async () => {},
    };
  }

  render() {
    // language=hbs
    return `
        <div class="w-full bg-white h-screen">
            {{{ Back to='/settings' }}}
            <div class="h-full max-h-screen py-12">
                <form id="form-settings" novalidate class="w-full max-w-[530px] px-3 flex flex-col items-center mx-auto">
                    <div class="mb-18 w-full flex flex-col items-center">
                        {{{ SettingsProfile name=name }}}
                    </div>
                    <div class="w-full mb-11">
                        {{#each fields}}
                            <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0 relative overflow-hidden">
                                <p class="text-sm text-black mr-2">{{this.label}}</p>
                                {{{ Input ref=this.id id=this.id type=this.type name=this.name required=this.required value=this.value
                                          validations=this.validations classes=this.classes placeholder=this.placeholder }}}
                            </div>
                        {{/each}}
                    </div>
                    <div class="w-full text-center">
                        {{{ Button label='Сохранить' classes='text-white bg-blue hover:opacity-80 text-base focus:bg-blue-dark active:bg-blue-dark min-w-[280px] text-center px-4 py-2 rounded-4' }}}
                    </div>
                </form>
            </div>
        </div>

    `;
  }
}
