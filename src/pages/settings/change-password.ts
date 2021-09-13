import ChangePasswordTemplate from './change-password.hbs';
import Block from '../../common/Block/Block';
import compile from '../../common/Renderer/compile';

export default class ChangePassword extends Block {
  constructor(props: Record<string, unknown>) {
    super(props);
  }

  render() {
    return compile(ChangePasswordTemplate, this.props);
  }
}
