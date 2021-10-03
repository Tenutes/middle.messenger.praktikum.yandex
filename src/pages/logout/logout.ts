import Block from '../../common/Block/Block';
import AuthController from '../../controllers/AuthController';
import Router from '../../common/Router/Router';

export class LogoutPage extends Block {
  async componentDidMount() {
    await AuthController.logout();
    await Router.go('/');
  }

  render() {
    return '<div></div>';
  }
}
