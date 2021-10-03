import Block from '../../common/Block/Block';

interface ButtonProps {
  label: string;
  classes?: string;
  extra?: string;
  onClick: () => void;
}

export default class Button extends Block {
  constructor({ onClick, ...props }: ButtonProps) {
    super({ ...props, events: { click: onClick } });
  }

  render(): string {
    // language=hbs
    return `
        <button class="{{classes}}" {{{extra}}}>{{label}}</button>`;
  }
}
