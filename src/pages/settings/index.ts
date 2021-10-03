import { SettingsPage } from './settings';
import { connect } from '../../store';
import { withRouter } from '../../common/helpers';
import registrationState from './state';

export default withRouter(connect((state: any) => ({ user: state.user || {}, ...registrationState }), SettingsPage));
