import Block from '../../../common/Block/Block';
import ChatFormTemplate from './chat-form.hbs';
import compile from '../../../common/Renderer/compile';

export default class ChatForm extends Block {
  constructor() {
    super();
  }

  render() {
    return compile(ChatFormTemplate, this.props);
  }
}
