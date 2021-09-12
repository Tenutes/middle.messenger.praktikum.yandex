import UpdateTemplate from './update.hbs';
import Block from '../../common/Block/Block';
import BackPartial from '../../components/back.hbs';
import ButtonPartial from '../../components/button.hbs';
import InputPartial from '../../components/input.hbs';
import SettingProfilePartial from '../../modules/settings-profile.hbs';
import { registerPartials } from '../../partials';
import compile from '../../common/Renderer/compile';

const partials = {
  back: BackPartial,
  button: ButtonPartial,
  input: InputPartial,
  'settings-profile': SettingProfilePartial,
};

export default class Update extends Block {
  constructor(props: Record<string, unknown>) {
    registerPartials(partials);
    super(props);
  }

  render() {
    return compile(UpdateTemplate, this.props);
  }
}
