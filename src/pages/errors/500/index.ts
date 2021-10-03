import { Page500 } from './500';
import { connect } from '../../../store';
import { withRouter } from '../../../common/helpers';

export default withRouter(connect(() => {}, Page500));
