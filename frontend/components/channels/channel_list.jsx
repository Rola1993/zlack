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
  }


  componentDidMount() {
  }

  render() {
    const channels = this.props.channels;
    return(
      <div className='channel-list'>
        <h5>Channels</h5>
        <div><i height="40" width="40" className="fa fa-plus-circle"></i></div>
        <ul>
          {channels.map((channel) => (
            <ChannelListItem
              channel={channel}
              key={channel.id}
            />
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelsList);
