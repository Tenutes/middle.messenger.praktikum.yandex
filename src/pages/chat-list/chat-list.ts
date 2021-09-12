import ChatListTemplate from './list.hbs';
import Block from '../../common/Block/Block';
import InputPartial from '../../components/input.hbs';
import ButtonPartial from '../../components/button.hbs';
import LinkPartial from '../../components/link.hbs';
import SearchPartial from '../../components/chat/search.hbs';
import ChatUserPartial from '../../components/chat/chat-user.hbs';
import ChatMessagePartial from '../../components/chat/chat-message.hbs';
import ChatFormPartial from '../../components/chat/chat-form.hbs';
import { registerPartials } from '../../partials';
import compile from '../../common/Renderer/compile';

const partials = {
  input: InputPartial,
  button: ButtonPartial,
  link: LinkPartial,
  search: SearchPartial,
  'chat-user': ChatUserPartial,
  'chat-message': ChatMessagePartial,
  'chat-form': ChatFormPartial,
};

export default class Login extends Block {
  constructor(props: Record<string, unknown>) {
    registerPartials(partials);
    super(props);
  }

  render() {
    return compile(ChatListTemplate, this.props);
  }
}
