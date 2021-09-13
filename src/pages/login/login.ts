import LoginTemplate from './login.hbs';
import Block from '../../common/Block/Block';
import compile from '../../common/Renderer/compile';

export default class Login extends Block {
  constructor(props: LoginProps) {
    super(props);
  }

  render() {
    return compile(LoginTemplate, this.props);
  }
}
