import { ChangePasswordPage } from './change-password';
import { connect } from '../../../store';
import { withRouter } from '../../../common/helpers';
import changePasswordState from './state';
import Block from '../../../common/Block/Block';

export default withRouter(
  connect((state: any) => ({ ...state, ...changePasswordState }), ChangePasswordPage as typeof Block)
);
