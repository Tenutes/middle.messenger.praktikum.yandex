import Registration from './registration';
import state from './state';

const module = () => import('./module');

export default {
  routes: [
    {
      path: '/register',
      component: Registration,
      state,
      module,
    },
  ],
};
