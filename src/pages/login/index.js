import login from './login.hbs';
import state from './state';

export default {
  routes: [
    {
      path: '/',
      template: login,
      state,
    },
  ],
};
