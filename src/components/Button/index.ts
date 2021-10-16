import Block from '../../common/Block/Block';

interface ButtonProps {
  label: string;
  pre_icon?: string;
  after_icon?: string;
  classes?: string;
  extra?: string;
  onClick?: () => void;
  events?: { click?: () => void };
}

export default class Button extends Block<ButtonProps> {
  constructor({ onClick, ...props }: ButtonProps) {
    super({ ...props, events: { click: onClick } });
  }

  static getName() {
    return 'Button';
  }

  render() {
    // language=hbs
    return `
        <button class="{{classes}}" {{{extra}}}>
            {{#if pre_icon}}
                <svg class="w-full h-full block{{#if icon_classes}} {{icon_classes}}{{/if}}">
                    <use href="/static/img/svg/sprite.svg#{{pre_icon}}"></use>
                </svg>
            {{/if}}
            {{label}}
            {{#if after_icon}}
                <svg class="w-full h-full block{{#if icon_classes}} {{icon_classes}}{{/if}}">
                    <use href="/static/img/svg/sprite.svg#{{after_icon}}"></use>
                </svg>
            {{/if}}
        </button>`;
  }
}
