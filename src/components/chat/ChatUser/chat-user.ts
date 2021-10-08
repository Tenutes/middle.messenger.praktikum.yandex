import Block from '../../../common/Block/Block';
import ChatUserTemplate from './chat-user.hbs';
import compile from '../../../common/Renderer/compile';

export default class ChatUser extends Block {
  constructor(props: Chat) {
    super(props);
  }

  render() {
    return compile(ChatUserTemplate, this.props);
  }
}
