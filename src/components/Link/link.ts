import Block from '../../common/Block/Block';
import LinkTemplate from './link.hbs';
import compile from '../../common/Renderer/compile';

export default class Link extends Block {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    return compile(LinkTemplate, this.props);
  }
}
