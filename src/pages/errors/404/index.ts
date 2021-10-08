import { Page404 } from './404';
import { connect } from '../../../store';
import { withRouter } from '../../../common/helpers';

export default withRouter(connect(() => {}, Page404));
