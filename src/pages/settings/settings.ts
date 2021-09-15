import SettingsTemplate from './settings.hbs';
import Block from '../../common/Block/Block';
import compile from '../../common/Renderer/compile';

export default class Settings extends Block {
  constructor(props: Record<string, unknown>) {
    super(props);
  }

  render() {
    return compile(SettingsTemplate, this.props);
  }
}
