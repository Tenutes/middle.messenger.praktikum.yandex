import Block from '../../common/Block/Block';
import { onFocus, onBlur } from '../../common/Form/helpers';

export interface InputProps {
  type: string;
  name: string;
  id: string;
  value?: string;
  placeholder?: string;
  classes?: string;
  label?: string;
  required?: boolean;
  validations?: ValidationRule[];
  onInput?: () => void;
  events?: { input?: () => void; focus: (e: Event) => void; blur: (e: Event) => void };
}

interface InputRefs {
  field: HTMLInputElement;
}

export default class Input extends Block<InputProps, InputRefs> {
  constructor({ onInput, ...props }: InputProps) {
    super({ ...props, events: { input: onInput, focus: onFocus, blur: onBlur } });
  }

  componentDidMount() {
    if (this.props.value && this.element) {
      (this.element as HTMLInputElement).value = this.props.value;
    }
  }

  static getName() {
    return 'Input';
  }

  render() {
    // language=hbs
    return `
        <input
                ref="field"
                class="{{classes}}"
                type="{{type}}"
                name="{{name}}"
                id="{{id}}"
            {{#if required}}
                required
            {{/if}}
            {{#if placeholder}}
                placeholder="{{placeholder}}"
            {{/if}}
        >
    `;
  }
}
