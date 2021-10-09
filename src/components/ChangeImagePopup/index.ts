import Block from '../../common/Block/Block';
import FileInput from '../../components/FileInput';
import { InputProps } from '../../components/Input';

interface PopupProps {
  responseError: string | null;
  error: string | null;
  uploadedName: string | null;
  input: InputProps;
  onChange: (e: Event) => void;
  onSubmit: (e: Event) => Promise<void>;
  onPopupClick?: (e: Event) => void;
  show: boolean;
  onUpdate: (formData: FormData) => Promise<void>;
  onClose?: () => void;
}

interface PopupRefs {
  form?: HTMLFormElement;
  file?: FileInput;
}

export default class ChangeImagePopup extends Block<PopupProps, PopupRefs> {
  constructor(props: PopupProps) {
    super(props);
  }

  static getName() {
    return 'ChangeImagePopup';
  }

  componentShouldUpdate(o: PopupProps, n: PopupProps) {
    return o.show !== n.show || o.error !== n.error || Boolean(n.error) || Boolean(n.responseError);
  }

  componentDidMount() {
    this.refs.form?.addEventListener('submit', (e: Event) => this.state.onSubmit?.(e));
  }

  getStateFromProps() {
    return {
      responseError: null,
      error: null,
      uploadedName: null,
      input: {
        id: 'file',
        name: 'file',
        type: 'file',
        required: true,
      },
      onChange: (e: Event) => {
        const files = (e.target as HTMLInputElement)?.files as FileList;
        const fileInput = this.refs.file;
        if (files[0]) {
          const { name } = files[0];
          this.state.error = null;
          fileInput?.setProps({ value: files, uploadedName: name });
        } else {
          fileInput?.setProps({ value: null, uploadedName: null });
        }
      },
      onSubmit: async (e: Event) => {
        e.preventDefault();
        const formData = new FormData(this.refs.form as HTMLFormElement);
        const file = formData.get('avatar') as File;
        if (file?.name && file?.size) {
          await (this.props as PopupProps).onUpdate(formData);
        } else {
          this.state.error = 'нужно выбрать файл';
        }
      },
      onPopupClick: (e: Event) => {
        if (e.target === this.element) {
          this.props.onClose?.();
        }
      },
    };
  }

  render() {
    // language=hbs
    return `
        <div class="fixed z-20 w-full inset-0 flex justify-center items-center duration-200{{#unless show }} invisible opacity-0{{/unless}}">
            <div class="absolute inset-0 bg-blue-light opacity-80 pointer-events-none"></div>
            <div class="w-full overflow-y-auto px-3 py-7 relative flex justify-center items-start relative max-h-full">
                <div class="w-[340px] h-full px-6 py-7 rounded-12 shadow-sm bg-white relative">
                    {{{ Button onClick=onClose pre_icon="cross" classes="absolute right-2 top-2 w-3 h-3 flex justify-center items-center rounded-full text-black hover:text-blue cursor-pointer" }}}
                    <div class="w-full">
                        <p class="text-center mb-5">Загрузить файл</p>
                        <form novalidate ref="form" class="relative text-center"
                        ">
                        {{{ FileInput ref='file' id='file' label='Выберите файл на компьютере' name='avatar'
                                      uploadedName=uploadedName
                                      accept='image/*' onChange=onChange
                                      uploadedClasses='cursor-pointer inline-block mb-5 text-center text-gray text-sm mx-auto'
                                      labelClasses='cursor-pointer inline-block mb-5 text-center text-blue text-sm underline mx-auto'
                                      classes='absolute opacity-0 w-0 h-0' }}}
                        {{{ Button label='Поменять' onClick=onSubmit classes='w-full text-center bg-blue text-white text-sm font-medium rounded-4 px-4 py-2 duration-200 hover:opacity-80 focus:bg-blue-dark active:bg-blue-dark' }}}
                        {{#if error}}
                            <p class="text-red text-sm mt-2">{{error}}</p>
                        {{/if}}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}
