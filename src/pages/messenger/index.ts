import { MessengerPage } from './messenger';
import { connect } from '../../store';
import { withRouter } from '../../common/helpers';
import messengerState from './state';
import { MessengerState } from '../../store/messenger';
import { UserData } from '../../api/AuthAPI';
import Block from '../../common/Block/Block';

export default withRouter(
  connect(
    ({
      messenger: { chats, search, chat },
      user: { profile },
    }: {
      messenger: MessengerState;
      user: { profile: UserData };
    }) => ({
      chats: chats || [],
      search: search || [],
      user: profile,
      chat: chat,
      ...messengerState,
    }),
    MessengerPage as typeof Block
  )
);
