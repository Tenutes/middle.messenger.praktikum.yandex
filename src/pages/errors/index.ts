import Page404 from './404';
import Page500 from './500';

export default {
  routes: [
    {
      path: '404',
      component: Page404,
    },
    {
      path: '/500',
      component: Page500,
    },
  ],
};
