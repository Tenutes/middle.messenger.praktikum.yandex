import Block from '../../common/Block/Block';
import ButtonTemplate from './button.hbs';
import { registerPartials } from '../../partials';
import compile from '../../common/Renderer/compile';

const partials = {
  button: ButtonTemplate,
};

export default class Button extends Block {
  constructor(props: ButtonProps) {
    registerPartials(partials);
    super(props);
  }

  render() {
    return compile(ButtonTemplate, this.props);
  }
}
