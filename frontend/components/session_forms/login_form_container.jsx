import { connect } from 'react-redux';
import { login, receiveErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state, ownProps) => ({
   errors: state.errors.session,
   formType: 'Sign in to your workspace'
});

const mapDispatchToProps = (dispatch, ownProps) => ({
   processForm: (user) => dispatch(login(user)),
   clearErrors: () => dispatch(receiveErrors([]))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
