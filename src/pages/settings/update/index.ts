import { SettingsUpdatePage } from './update';
import { connect } from '../../../store';
import { withRouter } from '../../../common/helpers';
import settingsUpdateState from './state';

export default withRouter(connect((state: any) => ({ ...state, ...settingsUpdateState }), SettingsUpdatePage));
