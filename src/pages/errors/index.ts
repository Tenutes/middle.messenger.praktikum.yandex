import Page404 from './404';
import Page500 from './500';
import state from './state';

export default {
  routes: [
    {
      path: '404',
      component: Page404,
      state: state,
    },
    {
      path: '/500',
      component: Page500,
      state: state,
    },
  ],
};
