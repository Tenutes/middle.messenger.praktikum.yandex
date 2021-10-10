import { LogoutPage } from './logout';
import { connect } from '../../store';
import { withRouter } from '../../common/helpers';
import Block from '../../common/Block/Block';

export default withRouter(connect(() => ({}), LogoutPage as typeof Block));
