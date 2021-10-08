import { LogoutPage } from './logout';
import { connect } from '../../store';
import { withRouter } from '../../common/helpers';

export default withRouter(connect(() => ({}), LogoutPage));
