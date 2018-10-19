import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchChannels} from '../../actions/channel_actions';
import ChannelListItem from './channel_list_item';

class ChannelsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      channels: this.props.channels
    };

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.channels.length != this.state.channels.length) {
      this.setState({["channels"]: nextProps.channels});
    }
  }

  componentDidMount() {
  }

  render() {
    let currentUserId = this.props.currentUserId;
    // debugger;

    let channels = this.props.channels.filter(c => c.user_ids.includes(currentUserId));
    // debugger;
    console.log(channels);
    return(
      <div>
        <div className='channel-list'>
          <h5>Channels</h5>
            <Link to="/channels/new" className="create-channel" style={{ textDecoration: 'none' }} >&oplus;</Link>
          <ul>
            {channels.filter(c => c.is_dm===false).map((channel) => (
              <ChannelListItem
                channel={channel}
                key={channel.id}
              />
            ))}
          </ul>
        </div>
          <br></br>
      <div className='channel-list'>
          <h5>Direct Messages</h5>
            <Link to="/channels/newdm" className="create-channel" style={{ textDecoration: 'none' }} >&oplus;</Link>
          <ul>
            {channels.filter(c => c.is_dm===true).map((channel) => (
              <ChannelListItem
                channel={channel}
                key={channel.id}
              />
            ))}
          </ul>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state,ownprops) => ({
  channels: Object.values(state.entities.channels),
  currentUserId: state.session.id,
  users: state.entities.users
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelsList);
