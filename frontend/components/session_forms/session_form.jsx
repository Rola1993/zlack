import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import GreetingContainer from '../greetings/greeting_container';


class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoSubmit = this.demoSubmit.bind(this);
    this.state = {
      username: "",
      password: ""
    };
  }

  componentWillUnmount() {
    this.props.clearErrors();
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

  demoSubmit(e) {
    e.preventDefault();
    const user = {
      username: "la101",
      password: "19931210"
    };
    this.props.processDemo(user);
  }

   render() {
    return (
      <div>
        <header>
           <div className='header-left'>
             <Link to="/"><div className='logo'></div></Link>
           </div>
           <div className='header-right'>
             <GreetingContainer/>
          </div>
        </header>
      <div className="session">
          {this.renderErrors()}
        <form onSubmit={this.handleSubmit}>
          <h3>{this.props.formType}</h3>
          <label>Enter your <strong>username</strong> and <strong>password</strong></label>
          <br></br>
          <br></br>
          <label>
             <input type='text' placeholder='username' value={this.state.username} onChange={this.update('username')} />
          </label>
           <br></br>
           <br></br>
          <label>
             <input type='password' placeholder='password' value={this.state.password} onChange={this.update('password')} />
          </label>
          <br></br>
          <br></br>
          <input type="submit" value="Continue ->" />
          {" "}
          <input type="submit" onClick={this.demoSubmit} value='Guest Login'/>
        </form>
      </div>
    </div>
    );
  }
}

export default withRouter(SessionForm);
