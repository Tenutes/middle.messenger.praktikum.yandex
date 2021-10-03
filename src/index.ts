require('babel-polyfill');
import './assets/scss/app.scss';
import './helpers';

import registerComponent, { BlockConstructable } from './common/register';
import Router from './common/Router/Router';
import Block from './common/Block/Block';
import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import SettingsPage from './pages/settings';
import MessengerPage from './pages/messenger/index';
import SettingsUpdatePage from './pages/settings/update';
import ChangePasswordPage from './pages/settings/change';
import Page500 from './pages/errors/500';
import Page404 from './pages/errors/404';

const components = require('./components/**/index.ts') as { [key: string]: { default: typeof Block } };
Object.values(components).forEach(component => {
  registerComponent(component.default as BlockConstructable);
});

Router.use('/', LoginPage)
  .use('/signup', RegistrationPage)
  .use('/messenger', MessengerPage)
  .use('/settings', SettingsPage)
  .use('/settings/update', SettingsUpdatePage)
  .use('/settings/change-password', ChangePasswordPage)
  .use('/500', Page500)
  .errorPage(Page404)
  .install();
