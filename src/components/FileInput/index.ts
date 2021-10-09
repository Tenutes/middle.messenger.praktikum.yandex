import Block from '../../common/Block/Block';

export interface FileInputProps {
  name: string;
  id: string;
  classes?: string;
  value: FileList | null;
  accept?: string;
  labelClasses?: string;
  label?: string;
  uploadedName?: string;
  required?: boolean;
  validations?: ValidationRule[];
  onChange: (e: Event) => void;
}

interface FileInputRefs {
  field: HTMLInputElement;
}

export default class FileInput extends Block<FileInputProps, FileInputRefs> {
  constructor(props: FileInputProps) {
    super(props);
  }

  static getName() {
    return 'FileInput';
  }

  componentDidMount() {
    const input = this.refs.field;
    input.files = this.props.value;
    input.addEventListener('change', (e: Event) => this.props.onChange(e));
  }

  componentDidUpdate() {
    const input = this.refs.field as HTMLInputElement;
    const props = this.props;
    input.files = props.value;
    input.addEventListener('change', (e: Event) => props.onChange(e));
  }

  render() {
    // language=hbs
    return `
        <label for="{{id}}" class="{{#if uploadedName}}{{uploadedClasses}}{{else}}{{labelClasses}}{{/if}}">
            {{#if uploadedName}}
                {{uploadedName}}
            {{else}}
                {{label}}
            {{/if}}
            <input
                    accept="{{accept}}"
                    ref="field"
                    class="{{classes}}"
                    type="file"
                    name="{{name}}"
                    id="{{id}}"
                {{#if required}}
                    required
                {{/if}}
            >
        </label>
    `;
  }
}
