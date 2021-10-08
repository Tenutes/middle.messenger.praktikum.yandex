import { ChangePasswordPage } from './change-password';
import { connect } from '../../../store';
import { withRouter } from '../../../common/helpers';
import changePasswordState from './state';

export default withRouter(connect((state: any) => ({ ...state, ...changePasswordState }), ChangePasswordPage));
