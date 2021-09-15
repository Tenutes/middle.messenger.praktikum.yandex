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
      state: state.settings,
      module,
    },
    {
      path: '/settings/update',
      component: Update,
      state: state.update,
      module,
    },
    {
      path: '/settings/change-password',
      component: ChangePassword,
      state: state.changePassword,
      module,
    },
  ],
};
