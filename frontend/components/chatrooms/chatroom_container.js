import {connect} from 'react-redux';

import Chatroom from './chatroom';
import {fetchMessages} from '../../actions/message_actions';
import {fetchUsers} from '../../actions/user_actions';
import { logout } from '../../actions/session_actions';

import { } from '../../reducers/selectors';

const mapStateToProps = state => ({
  messages: state.entities.messages,
  currentUserId: state.session.id,
  users: state.entities.users,
});

const mapDispatchToProps = dispatch => ({
  requestMessages: () => dispatch(fetchMessages()),
  requestUsers: () => dispatch(fetchUsers()),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatroom);
