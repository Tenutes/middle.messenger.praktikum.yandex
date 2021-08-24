import login from './login.hbs';
import state from './state';
const module = () => import('./module');

export default {
  routes: [
    {
      path: '/',
      template: login,
      state,
      module,
    },
  ],
};
