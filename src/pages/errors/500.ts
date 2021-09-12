import Template500 from './500.hbs';
import Block from '../../common/Block/Block';
import LinkPartial from '../../components/link.hbs';
import { registerPartials } from '../../partials';
import compile from '../../common/Renderer/compile';

const partials = {
  link: LinkPartial,
};

export default class Login extends Block {
  constructor(props: Record<string, unknown>) {
    registerPartials(partials);
    super(props);
  }

  render() {
    return compile(Template500, this.props);
  }
}
