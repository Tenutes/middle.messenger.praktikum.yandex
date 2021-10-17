import Block from '../../common/Block/Block';
import ChangeImagePopup from '../../components/ChangeImagePopup';
import UserController from '../../controllers/UserController';

interface SettingsProfileProps {
  name: string;
  popupActive: boolean;
  showPopup: (e: Event) => void;
  closePopup: (e?: Event) => void;
  onUpdate: (formData: FormData) => Promise<void>;
}

interface SettingsProfileRefs {
  profilePopup: ChangeImagePopup;
}

export default class SettingsProfile extends Block<SettingsProfileProps, SettingsProfileRefs> {
  constructor(props: SettingsProfileProps) {
    super(props);
  }

  static getName() {
    return 'SettingsProfile';
  }

  getStateFromProps() {
    return {
      popupActive: false,
      showPopup: (e: Event) => {
        e.preventDefault();
        this.refs.profilePopup.setProps({ show: true });
      },
      closePopup: (e?: Event) => {
        e?.preventDefault();
        this.refs.profilePopup.setProps({ show: false });
      },
      onUpdate: async (formData: FormData) => {
        await UserController.updateAvatar(formData);
        this.state.closePopup?.();
      },
    };
  }

  render() {
    // language=hbs
    return `
        <div class="">
            {{{ ChangeImagePopup ref='profilePopup' show=popupActive onUpdate=onUpdate onClose=closePopup }}}
            <div class="rounded-full mb-4 w-[130px] h-[130px] bg-gray-lighten relative cursor-pointer hover:target:[data-target]:opacity-100 hover:shadow-sm">
                <div
                        data-target
                        class="z-10 opacity-0 duration-200 flex justify-center items-center absolute inset-0 rounded-full bg-icon"
                >
                    {{{ Button onClick=showPopup label='Хочу другой' classes='text-base text-black w-full h-full rounded-full'}}}
                </div>
                <img
                        class="w-full h-full absolute top-1/2 left-1/2 transform-top-left-center rounded-full object-cover"
                    {{#if avatar}}
                        src="https://ya-praktikum.tech/api/v2/resources{{avatar}}"
                    {{else}}
                        src="/static/img/empty-image.svg"
                    {{/if}}
                />
            </div>
            <h2 class="text-black font-semibold text-base text-center">{{name}}</h2>
        </div>
    `;
  }
}
