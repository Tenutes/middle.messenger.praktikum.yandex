import template from './main.hbs';
import update from './update.hbs';
import changePassword from './change-password.hbs';
import state from './state';

const module = () => import('./module');

export default {
  routes: [
    {
      path: '/settings',
      template,
      state,
      module,
    },
    {
      path: '/settings/update',
      template: update,
      state,
      module,
    },
    {
      path: '/settings/change-password',
      template: changePassword,
      state,
      module,
    },
  ],
};
