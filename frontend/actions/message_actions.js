import * as MessageAPIUtil from '../util/message_api_util';

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

export const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
});

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  message
});

export const fetchMessages = () => dispatch => (
  MessageAPIUtil.fetchMessages().then(messages => (dispatch(receiveMessages(messages))))
);
