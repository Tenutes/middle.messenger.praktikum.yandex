import Block from '../../common/Block/Block';
import InputGroup from '../../components/InputGroup';
import Form from '../../common/Form/Form';
import { equalsMatch } from '../../common/Validator/constants';
import { SignupData } from '../../api/AuthAPI.js';
import AuthController from '../../controllers/AuthController';

export interface RegistrationProps {
  onRegister: (e: Event) => void;
}

export interface RegistrationRefs {
  login: InputGroup;
  password: InputGroup;
  password_repeat: InputGroup;
  email: InputGroup;
  first_name: InputGroup;
  second_name: InputGroup;
  phone: InputGroup;
  form: HTMLFormElement;
}

export class RegistrationPage extends Block<RegistrationProps, RegistrationRefs> {
  protected getStateFromProps() {
    return {
      onRegister: async (e: Event) => {
        e.preventDefault();

        const loginField = this.refs.login.refs.login;
        const passwordField = this.refs.password.refs.password;
        const passwordRepeatField = this.refs.password_repeat.refs.password_repeat;
        const emailField = this.refs.email.refs.email;
        const firstNameField = this.refs.first_name.refs.first_name;
        const secondNameField = this.refs.second_name.refs.second_name;
        const phoneField = this.refs.phone.refs.phone;
        const validationFields = [loginField, passwordField, emailField, firstNameField, secondNameField, phoneField];

        const registerForm = new Form(this.refs.form.id);
        registerForm.addValidationFields(validationFields);
        registerForm.addValidationField(passwordRepeatField, {
          fn: () => equalsMatch(passwordRepeatField.element as FormElement, passwordField.element as FormElement),
          errorReplacer: 'Пароли',
        });

        if (registerForm.isValid()) {
          const formData = registerForm.getValues() as unknown as SignupData;
          await AuthController.signup(formData);
        }
      },
    };
  }

  render() {
    // language=hbs
    return `
        <div class="flex flex-col items-center w-full bg-white h-screen justify-center">
            <div class="flex flex-col items-start justify-center max-h-screen">
                <form
                        ref="form"
                        id="form-register"
                        novalidate
                        class="bg-blue-light px-6 pb-5 pt-10 rounded-6 shadow-sm w-[340px] flex flex-col min-h-[450px]"
                >
                    <h2 class="text-black font-medium text-xl text-center mb-8">Регистрация</h2>
                    <div class="mb-10">
                        {{#each fields}}
                            {{{ InputGroup ref=this.id input=this label=this.label classes='mb-3 last:mb-0 relative pt-3' }}}
                        {{/each}}
                    </div>
                    {{#if user.error}}
                        <p class="text-red mb-2">{{user.error.reason}}</p>
                    {{/if}}
                    <div class="mt-auto text-center">
                        {{{ Button label='Зарегистрироваться' onClick=onRegister classes='w-full text-center bg-blue text-white text-sm font-medium rounded-4 px-4 py-2 mb-2 duration-200 hover:opacity-80 focus:bg-blue-dark active:bg-blue-dark' }}}
                        {{{ Link to='/' label='Уже есть аккаунт' classes='text-blue decoration-none hover:underline duration-200' }}}
                    </div>
                </form>
            </div>
        </div>
    `;
  }
}
