import {RECEIVE_MESSAGES} from '../actions/message_actions';

const messagesReducer = (state = [], action) => {
  let nextState = [];
  switch(action.type) {
    case RECEIVE_MESSAGES:
      return action.messages;
    default:
      return [];
  }
};

export default messagesReducer;
