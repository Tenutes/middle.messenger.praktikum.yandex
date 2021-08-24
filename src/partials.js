import Handlebars from 'handlebars/dist/handlebars.runtime';
import LoginPartial from './modules/login.hbs';
import BackPartial from './components/back.hbs';
import LinkPartial from './components/link.hbs';
import SettingsProfile from './modules/settings-profile.hbs';
import ButtonPartial from './components/button.hbs';
import InputPartial from './components/input.hbs';
import SearchPartial from './components/chat/search.hbs';

export default () => {
  Handlebars.registerPartial('login', LoginPartial);
  Handlebars.registerPartial('back', BackPartial);
  Handlebars.registerPartial('link', LinkPartial);
  Handlebars.registerPartial('button', ButtonPartial);
  Handlebars.registerPartial('input', InputPartial);
  Handlebars.registerPartial('settings-profile', SettingsProfile);
  Handlebars.registerPartial('search', SearchPartial);
}
