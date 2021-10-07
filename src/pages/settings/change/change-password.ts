import Block from '../../../common/Block/Block';
import Form from '../../../common/Form/Form';
import { UpdatePasswordData } from '../../../api/UserAPI';
import UserController from '../../../controllers/UserController';
import { equalsMatch } from '../../../common/Validator/constants';

interface ChangePasswordState {
  onUpdate: (e: Event) => void;
}

export class ChangePasswordPage extends Block {
  protected getStateFromProps() {
    return {
      onUpdate: async (e: Event) => {
        e.preventDefault();
        const passwordField = this.refs.password as Block;
        const passwordNewField = this.refs.password_new as Block;
        const passwordNewRepeatField = this.refs.password_new_repeat as Block;
        const fields = [passwordField, passwordNewField, passwordNewRepeatField];
        const updateForm = new Form(this.refs.form.id);

        updateForm.addValidationFields(fields);
        updateForm.addValidationField(passwordNewRepeatField, {
          fn: () => equalsMatch(passwordNewRepeatField.element as FormElement, passwordNewField.element as FormElement),
          errorReplacer: 'Пароли',
        });

        if (updateForm.isValid()) {
          const { password, password_new } = updateForm.getValues() as { password: string; password_new: string };
          const updateData: UpdatePasswordData = {
            oldPassword: password,
            newPassword: password_new,
          };

          await UserController.changePassword(updateData);
        }
      },
    };
  }

  componentDidMount() {
    (this.refs.form as HTMLFormElement).addEventListener(
      'submit',
      (this.state as ChangePasswordState).onUpdate.bind(this)
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
                        id="form-change-password"
                        novalidate
                        class="w-full max-w-[530px] px-3 flex flex-col items-center mx-auto"
                >
                    <div class="mb-18 w-full flex flex-col items-center">
                        {{{ SettingsProfile name=user.profile.first_name }}}
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
