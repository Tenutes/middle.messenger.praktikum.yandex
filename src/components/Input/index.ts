import Block from '../../common/Block/Block';

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
  onFocus?: () => void;
  onBlur?: () => void;
}

export default class Input extends Block {
  constructor({ onInput, onFocus, onBlur, ...props }: InputProps) {
    super({ ...props, events: { input: onInput, focus: onFocus, blur: onBlur } });
  }

  componentDidMount() {
    if ((this.props as InputProps).value) {
      (this.element! as FormElement).value = (this.props as InputProps).value as string;
    }
  }

  render() {
    // language=hbs
    return `
        <input
                data-ref="field"
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
