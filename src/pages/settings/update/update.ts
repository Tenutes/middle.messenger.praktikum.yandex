import Block from '../../../common/Block/Block';
import Form from '../../../common/Form/Form';
import { emailMatch, loginMatch, nameMatch, phoneMatch } from '../../../common/Validator/constants';
import { required } from '../../../common/Validator/Validator';
import { UpdateProfileData } from '../../../api/UserAPI';
import UserController from '../../../controllers/UserController';

interface SettingsUpdateState {
  onUpdate: (e: Event) => void;
}

export class SettingsUpdatePage extends Block {
  protected getStateFromProps() {
    return {
      onUpdate: async (e: Event) => {
        e.preventDefault();

        const updateForm = new Form(this.refs.form.id);
        const emailInput = this.refs.email as Block;
        const loginInput = this.refs.login as Block;
        const firstNameInput = this.refs.first_name as Block;
        const secondNameInput = this.refs.second_name as Block;
        const displayNameInput = this.refs.display_name as Block;
        const phoneInput = this.refs.phone as Block;

        const validationFields = [
          [emailInput, [{ fn: emailMatch }]],
          [loginInput, [{ fn: loginMatch }]],
          [firstNameInput, [{ fn: nameMatch }]],
          [secondNameInput, [{ fn: nameMatch }]],
          [phoneInput, [{ fn: phoneMatch }]],
          [displayNameInput, [{ fn: required }]],
        ];

        for (const [field, validations] of validationFields) {
          updateForm.addValidationField(field as Block, validations as ValidationRule[]);
        }

        if (updateForm.isValid()) {
          const updateData = updateForm.getValues() as unknown as UpdateProfileData;
          await UserController.update(updateData);
        }
      },
    };
  }

  componentDidMount() {
    (this.refs.form as HTMLFormElement).addEventListener(
      'submit',
      (this.state as SettingsUpdateState).onUpdate.bind(this)
    );
  }

  render() {
    // language=hbs
    return `
        <div class="w-full bg-white h-screen">
            {{{ Back to='/settings' }}}
            <div class="h-full max-h-screen py-12">
                <form
                        data-ref="form"
                        id="form-settings"
                        novalidate
                        class="w-full max-w-[530px] px-3 flex flex-col items-center mx-auto"
                >
                    <div class="mb-18 w-full flex flex-col items-center">
                        {{{ SettingsProfile name=user.profile.first_name avatar=user.profile.avatar }}}
                    </div>
                    <div class="w-full mb-11">
                        <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0 relative overflow-hidden">
                            <p class="text-sm text-black mr-2">Почта</p>
                            {{{ Input ref='email' id='email' type='email' name='email' required=true value=user.profile.email
                                      classes='text-sm text-gray border-0 w-1/2 text-right focus:text-blue-dark'
                                      placeholder='Почта' }}}
                        </div>
                        <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0 relative overflow-hidden">
                            <p class="text-sm text-black mr-2">Логин</p>
                            {{{ Input ref='login' id='login' type='text' name='login' required=true value=user.profile.login
                                      classes='text-sm text-gray border-0 w-1/2 text-right focus:text-blue-dark'
                                      placeholder='Логин' }}}
                        </div>
                        <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0 relative overflow-hidden">
                            <p class="text-sm text-black mr-2">Имя</p>
                            {{{ Input ref='first_name' id='first_name' type='text' name='first_name' required=true
                                      value=user.profile.first_name
                                      classes='text-sm text-gray border-0 w-1/2 text-right focus:text-blue-dark'
                                      placeholder='Имя' }}}
                        </div>
                        <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0 relative overflow-hidden">
                            <p class="text-sm text-black mr-2">Фамилия</p>
                            {{{ Input ref='second_name' id='second_name' type='text' name='second_name'
                                      required=true
                                      value=user.profile.second_name
                                      classes='text-sm text-gray border-0 w-1/2 text-right focus:text-blue-dark'
                                      placeholder='Фамилия' }}}
                        </div>
                        <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0 relative overflow-hidden">
                            <p class="text-sm text-black mr-2">Имя в чате</p>
                            {{{ Input ref='display_name' id='display_name' type='text' name='display_name'
                                      required=true value=user.profile.display_name
                                      classes='text-sm text-gray border-0 w-1/2 text-right focus:text-blue-dark'
                                      placeholder='Имя в чате' }}}
                        </div>
                        <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0 relative overflow-hidden">
                            <p class="text-sm text-black mr-2">Телефон</p>
                            {{{ Input ref='phone' id='phone' type='tel' name='phone' required=true value=user.profile.phone
                                      classes='text-sm text-gray border-0 w-1/2 text-right focus:text-blue-dark'
                                      placeholder='Телефон' }}}
                        </div>
                    </div>
                    {{#if profile.error}}
                        <p class="text-red mb-2">{{profile.error}}</p>
                    {{/if}}
                    {{#if profile.success}}
                        <p class="text-green mb-2">{{profile.success}}</p>
                    {{/if}}
                    <div class="w-full text-center">
                        {{{ Button onClick=onUpdate label='Сохранить' classes='text-white bg-blue hover:opacity-80 text-base focus:bg-blue-dark active:bg-blue-dark min-w-[280px] text-center px-4 py-2 rounded-4' }}}
                    </div>
                </form>
            </div>
        </div>

    `;
  }
}
