import {connect} from 'react-redux';

import Chatroom from './chatroom';
import {fetchMessages, receiveMessage} from '../../actions/message_actions';
import {fetchUsers} from '../../actions/user_actions';
import { logout } from '../../actions/session_actions';
import { fetchChannel,fetchChannels } from '../../actions/channel_actions';
import { } from '../../reducers/selectors';

const mapStateToProps = ({entities, session}, ownProps) => ({
  messages: Object.values(entities.messages),
  currentUserId: session.id,
  users: entities.users,
  selectedChannelId: parseInt(ownProps.match.params.channelId),
  channels: Object.values(entities.channels)
});

const mapDispatchToProps = dispatch => ({
  requestMessages: () => dispatch(fetchMessages()),
  receiveMessage: (message) => dispatch(receiveMessage(message)),
  requestUsers: () => dispatch(fetchUsers()),
  logout: () => dispatch(logout()),
  fetchChannel: id => dispatch(fetchChannel(id)),
  requestChannels: () => dispatch(fetchChannels())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatroom);
