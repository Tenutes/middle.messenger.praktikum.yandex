import { SettingsUpdatePage } from './update';
import { connect } from '../../../store';
import { withRouter } from '../../../common/helpers';
import Block from '../../../common/Block/Block';

export default withRouter(connect((state: any) => state, SettingsUpdatePage as typeof Block));
