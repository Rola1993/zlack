import * as ChannelAPIUtil from '../util/channel_api_util';

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";

export const receiveChannels = channels => ({
  type: RECEIVE_CHANNELS,
  channels
});

export const receiveChannel = payload => ({
  type: RECEIVE_CHANNEL,
  payload
});

export const fetchChannels = () => dispatch => (
  ChannelAPIUtil.fetchChannels().then(channels => (dispatch(receiveChannels(channels))))
);

export const fetchChannel = (id) => dispatch => (
  ChannelAPIUtil.fetchChannel(id).then(channel => (dispatch(receiveChannel(channel))))
);
