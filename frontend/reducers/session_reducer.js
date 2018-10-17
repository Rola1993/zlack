import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  SELECT_CHANNEL
} from '../actions/session_actions';
import merge from 'lodash/merge';

const sessionReducer = (state = {id:null}, action) => {
  Object.freeze(state);
  let nextState = merge({}, state);

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      nextState.id = action.currentUser.id;
      return nextState;
    case LOGOUT_CURRENT_USER:
      nextState.id = null;
      return nextState;
    case SELECT_CHANNEL:
      return merge({}, state, {selectedChannelId: action.id});
    default:
      return state;
  }
};

export default sessionReducer;
