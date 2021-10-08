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
console.log(components);
Object.values(components).forEach(component => {
  registerComponent(component.default as BlockConstructable);
});

const beforeEach: RouterBeforeEachFn = async (next, currentRoute): Promise<void> => {
  const user = await AuthController.fetchUser();
  if (!currentRoute) {
    return next();
  }
  if (currentRoute.pathname === '/') {
    if (user) {
      return Router.go('/messenger');
    }
    return next();
  } else {
    if (user || !currentRoute.props.requireAuth) {
      return next();
    }
    return Router.go('/');
  }
};

Router.use('/', { block: LoginPage })
  .use('/signup', { block: RegistrationPage })
  .use('/logout', { block: LogoutPage, meta: { requireAuth: true } })
  .use('/messenger', { block: MessengerPage, meta: { requireAuth: true } })
  .use('/settings', { block: SettingsPage, meta: { requireAuth: true } })
  .use('/settings/update', { block: SettingsUpdatePage, meta: { requireAuth: true } })
  .use('/settings/change-password', { block: ChangePasswordPage, meta: { requireAuth: true } })
  .use('/500', { block: Page500 })
  .errorPage(Page404)
  .beforeEach(beforeEach)
  .install();
