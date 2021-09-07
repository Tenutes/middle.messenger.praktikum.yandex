import template from './list.hbs';
import state from './state';

const module = () => import('./module');

export default {
  routes: [
    {
      path: '/chat-list',
      template,
      state,
      module,
    },
  ],
};
