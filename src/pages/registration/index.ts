import register from './registration.hbs';
import state from './state';

const module = () => import('./module');

export default {
  routes: [
    {
      path: '/register',
      template: register,
      state,
      module,
    },
  ],
};
