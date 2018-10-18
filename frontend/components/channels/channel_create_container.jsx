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

class ChannelForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      private: this.props.private
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
    return (
      <div className="channel-create-container">
          <Link className="x-button" to="/channels/1">&times;</Link>
          <form className="channel-create-form" onSubmit={this.handleSubmit}>
              <h1 className="form-title">{this.props.formType}</h1>
              <p>Channels are where your members communicate. They are best when organized around a topic — #leads, for example.</p>
              <br></br>
              <br></br>
              <label>Name</label>
              <br></br>
                <input
                  type='text'
                  placeholder='# e.g.leads'
                  value={this.state.name}
                  onChange={this.update('name')} />
               <br></br>
               <p>Names must be lowercase, without spaces or periods, and shorter than 22 characters.</p>
               <br></br>
            <Link to="/channels/1">Cancel</Link>
            <button>Create Channel</button>
          </form>
    </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    name: '',
    private: false,
    formType: 'Create a channel'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: channel => dispatch( createChannel(channel) )
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ChannelForm));
