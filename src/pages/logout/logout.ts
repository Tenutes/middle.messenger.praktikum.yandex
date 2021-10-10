import Block from '../../common/Block/Block';
import AuthController from '../../controllers/AuthController';
import Router from '../../common/Router/Router';

interface LogoutProps {}

export class LogoutPage extends Block<LogoutProps> {
  async componentDidMount() {
    await AuthController.logout();
    await Router.go('/');
  }

  render() {
    return '<div></div>';
  }
}
