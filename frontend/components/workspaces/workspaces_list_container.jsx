import {connect} from 'react-redux';

import WorkspacesList from './workspaces_list';
import { receiveWorkspaces, fetchWorkspaces } from '../../actions/workspace_actions';
import { selectAllWorkspace } from '../../reducers/selectors';


const mapStateToProps = state => ({
  workspaces: state.entities.workspaces
});

const mapDispatchToProps = dispatch => ({
  requestWorkspaces: () => dispatch(fetchWorkspaces())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkspacesList);
