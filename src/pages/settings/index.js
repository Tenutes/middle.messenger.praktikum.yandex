import template from './main.hbs';
import update from './update.hbs';
import state from './state';

export default {
  routes: [
    {
      path: '/settings',
      template,
      state,
    },
    {
      path: '/settings/update',
      template: update,
      state,
    },
  ],
};
