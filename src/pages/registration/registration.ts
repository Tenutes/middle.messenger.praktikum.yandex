import RegistrationPartial from './registration.hbs';
import Block from '../../common/Block/Block';
import InputPartial from '../../components/input.hbs';
import ButtonPartial from '../../components/button.hbs';
import LinkPartial from '../../components/link.hbs';
import { registerPartials } from '../../partials';
import compile from '../../common/Renderer/compile';

const partials = {
  input: InputPartial,
  button: ButtonPartial,
  link: LinkPartial,
};

export default class Registration extends Block {
  constructor(props: Record<string, unknown>) {
    registerPartials(partials);
    super(props);
  }

  render() {
    return compile(RegistrationPartial, this.props);
  }
}
