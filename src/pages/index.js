import Login from './login';
import Register from './registration';
import Errors from './errors';
import ChatList from './chat-list';
import Settings from './settings';

export default {
  routes: [
    ...Login.routes,
    ...Register.routes,
    ...Errors.routes,
    ...ChatList.routes,
    ...Settings.routes,
  ],
};
