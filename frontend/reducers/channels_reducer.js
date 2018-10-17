import {RECEIVE_CHANNELS} from '../actions/channel_actions';
import {RECEIVE_CHANNEL} from '../actions/channel_actions';


const channelsReducer = (state = [], action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CHANNELS:
      return action.channels;
    case RECEIVE_CHANNEL:
      return Object.assign({}, state, {[action.payload.id]: action.payload});
    default:
      return state;
  }
};

export default channelsReducer;
