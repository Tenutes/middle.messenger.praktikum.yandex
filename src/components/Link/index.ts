import Block from '../../common/Block/Block';
import Router from '../../common/Router/Router';

interface LinkProps {
  to: string;
  classes?: string;
  extra?: string;
  label: string;
  onClick: () => void;
}

export default class Link extends Block {
  constructor({ ...props }: LinkProps) {
    const onClick = (e: MouseEvent) => {
      Router.go((this.props as LinkProps).to);

      e.preventDefault();
    };

    super({ ...props, events: { click: onClick } });
  }

  static getName() {
    return 'Link';
  }

  render(): string {
    // language=hbs
    return `<a href="{{to}}" class="{{classes}}" {{{extra}}}>{{label}}</a>`;
  }
}
