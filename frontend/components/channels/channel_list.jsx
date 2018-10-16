import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchChannels} from '../../actions/channel_actions';


class ChannelsList extends React.Component {

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this.props.requestChannels();
  }

  render() {
    const channels = this.props.channels;

    return(
      <div className='channel-list'>
        <h5>Channels</h5>
        <ul>
          {channels.map((channel, idx) => (
            <li key={`channel-${idx}`}>
              # {channel.name}
            </li>
          ))}
        </ul>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  channels: state.entities.channels
});

const mapDispatchToProps = dispatch => ({
  requestChannels: () => dispatch(fetchChannels())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelsList);
