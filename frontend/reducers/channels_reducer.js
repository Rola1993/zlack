import {RECEIVE_CHANNELS} from '../actions/channel_actions';
import {RECEIVE_CHANNEL} from '../actions/channel_actions';
import merge from 'lodash/merge';

const channelsReducer = (state = [], action) => {
  Object.freeze(state);
  let nextState = {};
  switch(action.type) {
    case RECEIVE_CHANNELS:
      return merge({}, state, action.channels);
    case RECEIVE_CHANNEL:
        const newChl = { [action.payload.id]: action.payload };
        return merge({}, state, newChl);
    default:
      return state;
  }
};

export default channelsReducer;
