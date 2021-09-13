import Block from '../../common/Block/Block';
import BackTemplate from './back.hbs';
import compile from '../../common/Renderer/compile';

export default class Back extends Block {
  constructor(props: BackProps) {
    super(props);
  }

  render() {
    return compile(BackTemplate, this.props);
  }
}
