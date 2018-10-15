import * as MessageAPIUtil from '../util/message_api_util';

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";

export const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
});

export const fetchMessages = () => dispatch => (
  MessageAPIUtil.fetchMessages().then(messages => (dispatch(receiveMessages(messages))))
);
