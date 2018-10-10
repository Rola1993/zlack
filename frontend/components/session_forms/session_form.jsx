import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: "",
      password: ""
    };
  }

  update(field) {
    return(e) => {
      this.setState({[field]: e.target.value});
    };
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, idx) => (
          <li key={`error-${idx}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

   render() {
    return (
      <div>
        <h3>{this.props.formType}</h3>
          {this.renderErrors()}
        <form onSubmit={this.handleSubmit}>
          <label>Username:
             <input type='text' value={this.state.username} onChange={this.update('username')} />
          </label>
           <br></br>
           <br></br>
          <label>Password:
             <input type='password' value={this.state.password} onChange={this.update('password')} />
          </label>
          <br></br>
          <br></br>
          <input type="submit" value={this.props.formType} />
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
