import ChangePasswordTemplate from './change-password.hbs';
import Block from '../../common/Block/Block';
import BackPartial from '../../components/back.hbs';
import LinkPartial from '../../components/link.hbs';
import InputPartial from '../../components/input.hbs';
import ButtonPartial from '../../components/button.hbs';
import SettingProfilePartial from '../../modules/settings-profile.hbs';
import { registerPartials } from '../../partials';
import compile from '../../common/Renderer/compile';

const partials = {
  back: BackPartial,
  link: LinkPartial,
  input: InputPartial,
  button: ButtonPartial,
  'settings-profile': SettingProfilePartial,
};

export default class ChangePassword extends Block {
  constructor(props: Record<string, unknown>) {
    registerPartials(partials);
    super(props);
  }

  render() {
    return compile(ChangePasswordTemplate, this.props);
  }
}
