import template from './list.hbs';
import state from './state';

export default {
  routes: [
    {
      path: '/chat-list',
      template,
      state,
    },
  ],
};
