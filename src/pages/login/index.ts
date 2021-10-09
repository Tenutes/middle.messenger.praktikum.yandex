import { LoginPage } from './login';
import { connect } from '../../store';
import { withRouter } from '../../common/helpers';
import loginState from './state';
import Block from '../../common/Block/Block';

export default withRouter(
  connect((state: any) => ({ user: state.user || {}, ...loginState }), LoginPage as typeof Block)
);
