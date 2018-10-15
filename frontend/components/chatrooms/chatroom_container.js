import {connect} from 'react-redux';

import Chatroom from './chatroom';
import {fetchMessages} from '../../actions/message_actions';
import {fetchChannels} from '../../actions/channel_actions';
import {fetchUsers} from '../../actions/user_actions';
import { } from '../../reducers/selectors';

const mapStateToProps = state => ({
  messages: state.entities.messages,
  currentUserId: state.session.id,
  users: state.entities.users,
  channels: state.entities.channels
});

const mapDispatchToProps = dispatch => ({
  requestMessages: () => dispatch(fetchMessages()),
  requestChannels: () => dispatch(fetchChannels()),
  requestUsers: () => dispatch(fetchUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatroom);
