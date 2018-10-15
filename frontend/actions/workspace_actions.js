import * as WorkspaceAPIUtil from '../util/workspace_api_util';

export const RECEIVE_WORKSPACES = "RECEIVE_WORKSPACES";

export const receiveWorkspaces = workspaces => ({
  type: RECEIVE_WORKSPACES,
  workspaces
});

export const fetchWorkspaces = () => dispatch => (
  WorkspaceAPIUtil.fetchWorkspaces().then(workspaces => (dispatch(receiveWorkspaces(workspaces))))
);
