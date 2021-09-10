import page404 from './404.hbs';
import page500 from './500.hbs';

export default {
  routes: [
    {
      /** Без '/' - для корректного определения в роутере */
      path: '404',
      template: page404,
    },
    {
      path: '/500',
      template: page500,
    },
  ],
};
