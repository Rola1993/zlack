import { RECEIVE_USERS } from '../actions/user_actions';
import merge from 'lodash/merge';

const usersReducer= (state={}, action) => {
  Object.freeze(state);
  let nextState = {};
  switch(action.type) {
    case RECEIVE_USERS:
      action.users.forEach(user => {nextState[user.id] = user;});
      return nextState;
    default:
      return state;
  }
};

export default usersReducer;
