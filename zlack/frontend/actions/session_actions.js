import * as SessionAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

//REGULAR ACTION CREATOR
export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});


//THUNK ACTION CREATOR
export const login = (user) => dispatch => {
  return (
  SessionAPIUtil.createSession(user).then(user => ( dispatch(receiveCurrentUser(user))),
  err => (dispatch(receiveErrors(err.responseJSON))))
)
};

export const logout = () => dispatch => (
  SessionAPIUtil.destroySession().then(user => (dispatch(logoutCurrentUser())))
);

export const signup = (user) => dispatch => (
  SessionAPIUtil.createUser(user).then(user => ( dispatch(receiveCurrentUser(user))),
  err => (dispatch(receiveErrors(err.responseJSON))))
);
