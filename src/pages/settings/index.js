import template from './main.hbs';
import update from './update.hbs';
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
  ],
};
