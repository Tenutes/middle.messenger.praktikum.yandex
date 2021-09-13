import UpdateTemplate from './update.hbs';
import Block from '../../common/Block/Block';
import compile from '../../common/Renderer/compile';

export default class Update extends Block {
  constructor(props: Record<string, unknown>) {
    super(props);
  }

  render() {
    return compile(UpdateTemplate, this.props);
  }
}
