import { Page500 } from './500';
import { connect } from '../../../store';
import { withRouter } from '../../../common/helpers';
import Block from '../../../common/Block/Block';

export default withRouter(connect(() => ({}), Page500 as typeof Block));
