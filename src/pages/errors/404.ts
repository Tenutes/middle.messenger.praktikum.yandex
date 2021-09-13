import Template404 from './404.hbs';
import Block from '../../common/Block/Block';
import compile from '../../common/Renderer/compile';

export default class Login extends Block {
  constructor(props: Record<string, unknown>) {
    super(props);
  }

  render() {
    return compile(Template404, this.props);
  }
}
