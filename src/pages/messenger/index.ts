import { MessengerPage } from './messenger';
import { connect } from '../../store';
import { withRouter } from '../../common/helpers';
import messengerState from './state';

export default withRouter(connect((state: any) => ({ user: state.user || {}, ...messengerState }), MessengerPage));
