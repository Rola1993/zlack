import {RECEIVE_MESSAGES, RECEIVE_MESSAGE} from '../actions/message_actions';
import merge from 'lodash/merge';

const messagesReducer = (state = {}, action) => {
  let nextState = {};
  switch(action.type) {
    case RECEIVE_MESSAGES:
      action.messages.forEach(msg => {
        nextState[msg.id] = msg;
      })
      return action.messages;
    case RECEIVE_MESSAGE:
      const newMsg = {[action.message.id]: action.message};
      return merge({}, state, newMsg);
    default:
      return state;
  }
};

export default messagesReducer;
