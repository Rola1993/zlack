import { connect } from 'react-redux';
import { signup, receiveErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => ({
  errors: state.errors.session,
  formType: 'Start with a workspace'
});

const mapDispatchToProps = dispatch => ({
   processForm: (user) => dispatch(signup(user)),
   clearErrors: () => dispatch(receiveErrors([]))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
