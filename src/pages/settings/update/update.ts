import Block from '../../../common/Block/Block';
import Form from '../../../common/Form/Form';
import Input from '../../../components/Input';
import { emailMatch, loginMatch, nameMatch, phoneMatch } from '../../../common/Validator/constants';
import { required } from '../../../common/Validator/Validator';
import UserController from '../../../controllers/UserController';

export interface SettingsUpdateProps {
  onUpdate: (e: Event) => void;
}

export interface SettingsUpdateRefs {
  updateForm: HTMLFormElement;
  email: Input;
  login: Input;
  first_name: Input;
  second_name: Input;
  display_name: Input;
  phone: Input;
}

export class SettingsUpdatePage extends Block<SettingsUpdateProps, SettingsUpdateRefs> {
  protected getStateFromProps() {
    return {
      onUpdate: async (e: Event) => {
        e.preventDefault();

        const updateForm = new Form(this.refs.updateForm.id);
        const emailInput = this.refs.email;
        const loginInput = this.refs.login;
        const firstNameInput = this.refs.first_name;
        const secondNameInput = this.refs.second_name;
        const displayNameInput = this.refs.display_name;
        const phoneInput = this.refs.phone;

        const validationFields = [
          { field: emailInput, validations: [{ fn: emailMatch }] },
          { field: loginInput, validations: [{ fn: loginMatch }] },
          { field: firstNameInput, validations: [{ fn: nameMatch }] },
          { field: secondNameInput, validations: [{ fn: nameMatch }] },
          { field: phoneInput, validations: [{ fn: phoneMatch }] },
          { field: displayNameInput, validations: [{ fn: required }] },
        ];

        for (const { field, validations } of validationFields) {
          updateForm.addValidationField(field, validations as ValidationRule[]);
        }

        if (updateForm.isValid()) {
          const updateData = {
            first_name: (firstNameInput.element as HTMLInputElement).value,
            second_name: (secondNameInput.element as HTMLInputElement).value,
            login: (loginInput.element as HTMLInputElement).value,
            email: (emailInput.element as HTMLInputElement).value,
            display_name: (displayNameInput.element as HTMLInputElement).value,
            phone: (phoneInput.element as HTMLInputElement).value,
          };
          await UserController.update(updateData);
        }
      },
    };
  }

  componentDidMount() {
    this.refs.updateForm.addEventListener('submit', this.state.onUpdate!.bind(this));
  }

  render() {
    // language=hbs
    return `
        <div class="w-full bg-white h-screen">
            {{{ Back to='/settings' }}}
            <div class="h-full max-h-screen py-12">
                <form
                        ref="updateForm"
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
