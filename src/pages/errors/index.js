import page404 from './404.handlebars';
import page500 from './500.handlebars';

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
