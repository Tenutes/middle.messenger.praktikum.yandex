import ChangePassword from './change-password';
import Settings from './settings';
import state from './state';
import Update from './update';

const module = () => import('./module');

export default {
  routes: [
    {
      path: '/settings',
      component: Settings,
      state,
      module,
    },
    {
      path: '/settings/update',
      component: Update,
      state,
      module,
    },
    {
      path: '/settings/change-password',
      component: ChangePassword,
      state,
      module,
    },
  ],
};
