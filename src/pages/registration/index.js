import register from './registration.hbs';
import state from './state';

export default {
  routes: [
    {
      path: '/register',
      template: register,
      state,
    },
  ],
};
