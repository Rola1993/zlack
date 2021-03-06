import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import { selectChannel } from '../../actions/session_actions';

const mapStateToProps = ({ entities: {channels}, session }, ownProps) => ({
  channel: ownProps.channel,
  channels: Object.values(channels)
});

const mapDispatchToProps = dispatch => ({
});


class ChannelListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const channelId = this.props.channel.id;
    this.props.history.push(`/channels/${channelId}`);
  }



  render() {
    const channel = this.props.channel;
    if (channel.is_dm === false) {
    return (
      <div className="channel-list-item" onClick={this.handleClick}>
        <li>
          <button>
            <div className="channel-name">
              <div className="symbol-channel">#
              </div>
              <p>{channel.name}</p>
            </div>
          </button>
        </li>
      </div>
    );} else {
      return (
        <div className="channel-list-item" onClick={this.handleClick}>
          <li>
            <button>
              <div className="channel-name">
                <i className="fa fa-circle"
                  aria-hidden="true">
                </i>
                <p>{channel.name}</p>
              </div>
            </button>
          </li>
        </div>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelListItem));
