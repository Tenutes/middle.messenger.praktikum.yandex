require('babel-polyfill');
import './assets/scss/app.scss';
import './helpers';

import AuthController from './controllers/AuthController';
import registerComponent, { BlockConstructable } from './common/register';
import Router, { RouterBeforeEachFn } from './common/Router/Router';
import Block from './common/Block/Block';
import LoginPage from './pages/login';
import LogoutPage from './pages/logout';
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

const beforeEach: RouterBeforeEachFn = async (next, currentRoute): Promise<void> => {
  const user = await AuthController.fetchUser();

  if (currentRoute === '/') {
    if (user) {
      return Router.go('/messenger');
    }
    return next();
  } else {
    if (user) {
      return next();
    }
    return Router.go('/');
  }
};

Router.use('/', LoginPage)
  .use('/logout', LogoutPage)
  .use('/signup', RegistrationPage)
  .use('/messenger', MessengerPage)
  .use('/settings', SettingsPage)
  .use('/settings/update', SettingsUpdatePage)
  .use('/settings/change-password', ChangePasswordPage)
  .use('/500', Page500)
  .errorPage(Page404)
  .beforeEach(beforeEach)
  .install();
