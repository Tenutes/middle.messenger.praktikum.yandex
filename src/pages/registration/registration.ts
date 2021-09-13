import RegistrationTemplate from './registration.hbs';
import Block from '../../common/Block/Block';
import compile from '../../common/Renderer/compile';

export default class Registration extends Block {
  constructor(props: Record<string, unknown>) {
    super(props);
  }

  render() {
    return compile(RegistrationTemplate, this.props);
  }
}
