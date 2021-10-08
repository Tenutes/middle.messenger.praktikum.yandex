import { RegistrationPage } from './registration';
import { connect } from '../../store';
import { withRouter } from '../../common/helpers';
import registrationState from './state';

export default withRouter(
  connect((state: any) => ({ user: state.user || {}, ...registrationState }), RegistrationPage)
);
