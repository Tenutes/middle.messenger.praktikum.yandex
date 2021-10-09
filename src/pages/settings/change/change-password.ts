import Block from '../../../common/Block/Block';
import Form from '../../../common/Form/Form';
import UserController from '../../../controllers/UserController';
import { equalsMatch } from '../../../common/Validator/constants';
import Input from '../../../components/Input';

export interface ChangePasswordProps {
  onUpdate: (e: Event) => void;
}

export interface ChangePasswordRefs {
  password: Input;
  password_new: Input;
  password_new_repeat: Input;
  updateForm: HTMLFormElement;
}

export class ChangePasswordPage extends Block<ChangePasswordProps, ChangePasswordRefs> {
  protected getStateFromProps() {
    return {
      onUpdate: async (e: Event) => {
        e.preventDefault();
        const passwordField = this.refs.password;
        const passwordNewField = this.refs.password_new;
        const passwordNewRepeatField = this.refs.password_new_repeat;
        const fields = [passwordField, passwordNewField, passwordNewRepeatField];
        const updateForm = new Form(this.refs.updateForm.id);

        updateForm.addValidationFields(fields);
        updateForm.addValidationField(passwordNewRepeatField, {
          fn: () => equalsMatch(passwordNewRepeatField.element as FormElement, passwordNewField.element as FormElement),
          errorReplacer: 'Пароли',
        });

        if (updateForm.isValid()) {
          const updateData = {
            oldPassword: (passwordField.element as HTMLInputElement).value,
            newPassword: (passwordNewField.element as HTMLInputElement).value,
          };

          await UserController.changePassword(updateData);
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
                        id="form-change-password"
                        novalidate
                        class="w-full max-w-[530px] px-3 flex flex-col items-center mx-auto"
                >
                    <div class="mb-18 w-full flex flex-col items-center">
                        {{{ SettingsProfile name=user.profile.first_name avatar=user.profile.avatar }}}
                    </div>
                    <div class="w-full mb-11">
                        {{#each fields}}
                            <div class="flex justify-between border-b border-gray-lightest py-2 last:border-0 relative overflow-hidden">
                                <p class="text-sm text-black mr-2">{{this.label}}</p>
                                {{{ Input ref=this.id id=this.id type=this.type name=this.name required=this.required
                                          validations=this.validations classes=this.classes placeholder=this.placeholder }}}
                            </div>
                        {{/each}}
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
