import SettingsTemplate from './main.hbs';
import Block from '../../common/Block/Block';
import BackPartial from '../../components/back.hbs';
import LinkPartial from '../../components/link.hbs';
import ButtonPartial from '../../components/button.hbs';
import SettingProfilePartial from '../../modules/settings-profile.hbs';
import { registerPartials } from '../../partials';
import compile from '../../common/Renderer/compile';

const partials = {
  back: BackPartial,
  link: LinkPartial,
  button: ButtonPartial,
  'settings-profile': SettingProfilePartial,
};

export default class Settings extends Block {
  constructor(props: Record<string, unknown>) {
    registerPartials(partials);
    super(props);
  }

  render() {
    return compile(SettingsTemplate, this.props);
  }
}
