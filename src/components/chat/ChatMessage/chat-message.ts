import Block from '../../../common/Block/Block';
import ChatMessageTemplate from './chat-message.hbs';
import compile from '../../../common/Renderer/compile';

export default class ChatMessage extends Block {
  constructor(props: Message) {
    super(props);
  }

  render() {
    return compile(ChatMessageTemplate, this.props);
  }
}
