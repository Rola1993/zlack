import React from 'react';
import { Link } from 'react-router-dom';

class Greeting extends React.Component {

  componentDisMount() {

  }

  render() {
    const currentUser = this.props.currentUser;
    if (currentUser) {
      return (
        <div>
        <h2>Welcome! {currentUser.username}</h2>
        <button onClick={this.props.logout}>Log Out</button>
        </div>);
    } else {
     return (
        <div>
        <Link to="/login"><button>Sign In</button></Link>
        <span> </span>
        <Link to="/signup"><button>Sign Up</button></Link>
        </div>);
    }
  }
}

export default Greeting;
