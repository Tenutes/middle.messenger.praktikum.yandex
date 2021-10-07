import Block from '../Block/Block';

export default class Route {
  pathname: string;
  private readonly blockClass: typeof Block;
  private block: Block | null;
  props: any;

  constructor(pathname: string, view: typeof Block, props: any) {
    this.pathname = pathname;
    this.blockClass = view;
    this.block = null;
    this.props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.block) {
      if (this.block.cdmTimeout) {
        clearTimeout(this.block.cdmTimeout);
        this.block.cdmTimeout = null;
      }
      this.block.element?.remove();
    }
  }

  match(pathname: string) {
    return pathname === this.pathname;
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass();
    }

    const root = document.querySelector(this.props.rootQuery);

    if (!root) {
      throw new Error('Root not found');
    }
    root.innerHTML = '';
    let content = this.block.getContent();

    if (!content) {
      content = document.createElement('div');
    }
    root.appendChild(content);
  }
}
