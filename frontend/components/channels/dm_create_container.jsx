import {connect} from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';
import {createChannel} from '../../actions/channel_actions';
import {
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';

class DmForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      is_dm: true,
      user_ids:[]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
  }

  update(field) {
    return(e) => {
      this.setState({[field]: e.target.value});
    };
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state);
    this.props.history.push('/channels/1');
  }

   render() {
     window.state = this.state
     window.props = this.props
     const users = this.props.users
    return (
      <div className="dm-create-container">
          <Link className="x-button" to="/channels/1">&times;</Link>
          <form className="dm-create-form" onSubmit={this.handleSubmit}>
              <h1 className="form-title">{this.props.formType}</h1>
              <br></br>
              <br></br>
                <input
                  type='text'
                  placeholder=' Start a conversation'
                  value={this.state.name}
                  onChange={this.update('name')} />
                <button className="go-button">Go</button>
                <br></br>
                <br></br>
                  <ul>
                    {users.map((user, idx) => {
                      return (
                      <li key={`user-${idx}`}>
                        <button className="select-user">
                          <div className="user-pic">
                            <img src={user.img_url}
                              height="40" width="40"/>
                          </div>
                          <div className="username">
                          { user.username }
                          </div>
                        </button>
                      </li>
                    )}
                  )}
                  </ul>
          </form>
    </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    name: '',
    formType: 'Direct Messages',
    users: Object.values(state.entities.users)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: channel => dispatch( createChannel(channel) )
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(DmForm));
