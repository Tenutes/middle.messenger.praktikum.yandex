import ChatList from './chat-list';
import state from './state';

const module = () => import('./module');

export default {
  routes: [
    {
      path: '/chat-list',
      component: ChatList,
      state,
      module,
    },
  ],
};
