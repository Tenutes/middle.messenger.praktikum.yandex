import Block from '../../common/Block/Block';
import SettingsProfileTemplate from './settings-profile.hbs';
import { registerPartials } from '../../partials';
import compile from '../../common/Renderer/compile';

const partials = {
  link: SettingsProfileTemplate,
};

export default class SettingsProfile extends Block {
  constructor(props: SettingsProfileProps) {
    registerPartials(partials);
    super(props);
  }

  render() {
    return compile(SettingsProfileTemplate, this.props);
  }
}
