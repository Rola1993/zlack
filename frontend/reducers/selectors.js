import values from 'lodash/values';

export const selectAllWorkspace = state => values(state.entities.workspaces);

export const allMessages = entities => values(entities.messages);