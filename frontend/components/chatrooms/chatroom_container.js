import {connect} from 'react-redux';

import Chatroom from './chatroom';
import {fetchMessages} from '../../actions/message_actions';
import { } from '../../reducers/selectors';

const mapStateToProps = state => ({
  messages: state.entities.messages,
  currentUserId: state.session.id,
  users: state.entities.users
});

const mapDispatchToProps = dispatch => ({
  requestMessages: () => dispatch(fetchMessages())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatroom);
