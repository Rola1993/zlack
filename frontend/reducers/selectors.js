import values from 'lodash/values';

export const selectAllWorkspace = state => values(state.entities.workspaces);
