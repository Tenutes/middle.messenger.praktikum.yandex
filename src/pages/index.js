import ChatList from './chat-list';
import Errors from './errors';
import Login from './login';
import Register from './registration';
import Settings from './settings';

export default {
  routes: [...Login.routes, ...Register.routes, ...Errors.routes, ...ChatList.routes, ...Settings.routes],
};
