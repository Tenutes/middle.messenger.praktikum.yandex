import { SettingsPage } from './settings';
import Block from '../../common/Block/Block';
import { connect } from '../../store';
import { withRouter } from '../../common/helpers';

export default withRouter(connect((state: any) => ({ user: state.user || {} }), SettingsPage as typeof Block));
