import {RECEIVE_WORKSPACES} from '../actions/workspace_actions';

const workspacesReducer = (state = [], action) => {
  let nextState = [];
  switch(action.type) {
    case RECEIVE_WORKSPACES:
      return action.workspaces;
    default:
      return state;
  }
};

export default workspacesReducer;

// action.workspaces.forEach( workspace => {
//   nextState[workspace.id] = workspace;
// });
