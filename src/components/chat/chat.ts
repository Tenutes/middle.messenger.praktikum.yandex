import Block from '../../common/Block/Block';
import ChatTemplate from './chat.hbs';
import compile from '../../common/Renderer/compile';

export default class Chat extends Block {
  constructor(props: CurrentChatProps) {
    super(props);
  }

  render() {
    return compile(ChatTemplate, this.props);
  }
}
