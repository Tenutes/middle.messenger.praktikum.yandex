import Template500 from './500.hbs';
import Block from '../../common/Block/Block';
import compile from '../../common/Renderer/compile';

export default class Login extends Block {
  constructor(props: Record<string, unknown>) {
    super(props);
  }

  render() {
    return compile(Template500, this.props);
  }
}
