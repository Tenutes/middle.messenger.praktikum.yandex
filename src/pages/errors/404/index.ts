import { Page404 } from './404';
import { connect } from '../../../store';
import { withRouter } from '../../../common/helpers';
import Block from '../../../common/Block/Block';

export default withRouter(connect(() => ({}), Page404 as typeof Block));
