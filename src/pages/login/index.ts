import Login from './login';
import state from './state';

const module = () => import('./module');

export default {
  routes: [
    {
      path: '/',
      component: Login,
      state,
      module,
    },
  ],
};
