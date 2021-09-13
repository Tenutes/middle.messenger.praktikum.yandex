import ChatListTemplate from './list.hbs';
import Block from '../../common/Block/Block';
import compile from '../../common/Renderer/compile';

export default class Login extends Block {
  constructor(props: Record<string, unknown>) {
    super(props);
  }

  render() {
    return compile(ChatListTemplate, this.props);
  }
}
