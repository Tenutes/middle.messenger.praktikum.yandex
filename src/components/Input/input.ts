import Block from '../../common/Block/Block';
import InputTemplate from './input.hbs';
import { registerPartials } from '../../partials';
import compile from '../../common/Renderer/compile';

const partials = {
  button: InputTemplate,
};

export default class Input extends Block {
  constructor(props: InputProps) {
    registerPartials(partials);
    super(props);
  }

  render() {
    return compile(InputTemplate, this.props);
  }
}
