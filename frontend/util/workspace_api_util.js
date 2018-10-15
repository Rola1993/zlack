export const fetchWorkspaces = () => (
  $.ajax({
    method: 'GET',
    url: '/api/workspaces'
  })
);
