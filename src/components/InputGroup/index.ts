import Block from '../../common/Block/Block';
import Input, { InputProps } from '../Input';

interface InputGroupProps {
  input: InputProps;
  label: string;
  classes: string;
  ref: string;
}

interface InputGroupRefs {
  [key: InputProps['id']]: Input;
}

export default class InputGroup extends Block<InputGroupProps, InputGroupRefs> {
  constructor(props: InputGroupProps) {
    super(props);
  }

  static getName() {
    return 'InputGroup';
  }

  render() {
    // language=hbs
    return `
        <div class="{{classes}}">
            {{{ Input ref=input.id id=input.id type=input.type name=input.name required=input.required label=input.label
                      validations=input.validations classes=input.classes onInput=input.onInput }}}
            {{#if label}}
                <label for="{{input.id}}" class="absolute top-0 left-0 text-gray text-sm">{{label}}</label>
            {{/if}}
        </div>
    `;
  }
}
