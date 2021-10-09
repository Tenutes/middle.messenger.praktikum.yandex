import Block from '../../common/Block/Block';
import Router from '../../common/Router/Router';

interface LinkProps {
  to: string;
  classes?: string;
  extra?: string;
  label: string;
  events?: {
    click: (e: Event) => Promise<void>;
  };
}

export default class Link extends Block<LinkProps> {
  constructor({ ...props }: LinkProps) {
    const onClick = async (e: Event) => {
      e.preventDefault();
      await Router.go(this.props.to);
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
