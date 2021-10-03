import Block from '../../common/Block/Block';
import AuthController from '../../controllers/AuthController';
import { LoginProps } from './types';
import Input from '../../components/Input';
import Form from '../../common/Form/Form';
import { SignInData } from '../../api/AuthAPI';
import Router from '../../common/Router/Router';

interface loginState {
  onLogin: () => void;
}

export class LoginPage extends Block {
  protected getStateFromProps() {
    return {
      onLogin: async (e: Event) => {
        e.preventDefault();

        const loginField = (this.refs.login as Block).refs.login as Input;
        const passwordField = (this.refs.password as Block).refs.password as Input;
        const loginForm = new Form(this.refs.form.id);
        loginForm.addValidationField(loginField).addValidationField(passwordField);

        if (loginForm.isValid()) {
          const formData = (loginForm.getValues() as unknown) as SignInData;
          await AuthController.login(formData);
        }
      },
    };
  }

  async componentDidMount() {
    (this.refs.form as HTMLFormElement).addEventListener('submit', (this.state as loginState).onLogin.bind(this));
    if ((this.props as LoginProps).user.profile) {
      await Router.go('/messenger');
    }
  }

  render() {
    console.log('wtf');
    // language=hbs
    return `
        <div class="flex flex-col items-center w-full bg-white h-screen justify-center">
            <div class="flex flex-col items-start justify-center max-h-screen">
                <form
                        data-ref="form"
                        id="form-login"
                        novalidate
                        class="bg-blue-light px-6 pb-5 pt-10 rounded-6 shadow-sm w-[340px] flex flex-col min-h-[450px]"
                >
                    <h2 class="text-black font-medium text-xl text-center mb-8">Войти</h2>
                    <div class="mb-10">
                        {{#each fields}}
                            {{{ InputGroup ref=this.id input=this label=this.label classes='mb-3 last:mb-0 relative pt-3' }}}
                        {{/each}}
                    </div>
                    {{#if user.error}}
                        <p class="text-red">{{user.error.reason}}</p>
                    {{/if}}
                    <div class="mt-auto text-center">
                        {{{ Button label='Войти' onClick=onLogin classes='w-full text-center bg-blue text-white text-sm font-medium rounded-4 px-4 py-2 mb-2 duration-200 hover:opacity-80 focus:bg-blue-dark active:bg-blue-dark' }}}
                        {{{ Link to='/signup' label='Ещё не зарегистрированы?' classes='text-blue decoration-none hover:underline duration-200' }}}
                    </div>
                </form>
            </div>
        </div>
    `;
  }
}
