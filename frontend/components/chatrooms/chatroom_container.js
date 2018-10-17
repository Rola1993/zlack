import {connect} from 'react-redux';

import Chatroom from './chatroom';
import {fetchMessages} from '../../actions/message_actions';
import {fetchUsers} from '../../actions/user_actions';
import { logout } from '../../actions/session_actions';
import { fetchChannel,fetchChannels } from '../../actions/channel_actions';
import { } from '../../reducers/selectors';

const mapStateToProps = ({entities, session}, ownProps) => ({
  messages: entities.messages,
  currentUserId: session.id,
  selectedChannelId: parseInt(ownProps.match.params.channelId),
  users: entities.users,
  channels: entities.channels
});

const mapDispatchToProps = dispatch => ({
  requestMessages: () => dispatch(fetchMessages()),
  requestUsers: () => dispatch(fetchUsers()),
  logout: () => dispatch(logout()),
  fetchChannel: id => dispatch(fetchChannel(id)),
  requestChannels: () => dispatch(fetchChannels())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatroom);
