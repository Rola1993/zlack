import {connect} from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';
import {createChannel} from '../../actions/channel_actions';
import {
  Link
} from 'react-router-dom';

class DmForm extends React.Component {

  constructor(props) {
    super(props);
    let currentUser = this.props.users[props.currentUserId];
    this.state = {
      name: currentUser.username,
      is_dm: true,
      user_ids: [currentUser.id]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToTarget = this.redirectToTarget.bind(this);
  }

  update(field) {
    return(e) => {
      this.setState({[field]: e.target.value});
    };
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state);
    this.redirectToTarget();
  }

  redirectToTarget(){
    this.props.history.push(`/channels/1`)
  }

  selectUser(user) {
    return(e) => {
      e.preventDefault();
      let oldName = this.state.name;
      let nextName = oldName + ',' + user.username;
      if (nextName[0] == ',') {
        nextName = nextName.slice(1);
      }
      let oldUserArr = this.state.user_ids;
      let nextUserArr = oldUserArr.concat([user.id]);
      this.setState({['name']: nextName});
      this.setState({['user_ids']: nextUserArr});
    };
  }

   render() {
     window.state = this.state;
     window.props = this.props;
     let currentUser = this.props.users[props.currentUserId];
     const users = Object.values(this.props.users);
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
                <p>Select users from below to create a group chat</p>
                <button className="go-button">Go</button>
                <br></br>
                <br></br>
                <br></br>
                  <ul className="user">
                    {users.map((user, idx) => {
                      if (user.id === currentUser.id) {
                        return;
                      }
                      return (
                      <li key={`user-${idx}`}>
                        <button className="select-user" onClick={this.selectUser(user)}>
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
    users: state.entities.users,
    currentUserId: state.session.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: channel => dispatch( createChannel(channel) )
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(DmForm));
