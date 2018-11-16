import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import Cable from 'actioncable';
import ChannelListContainer from '../channels/channel_list';

class Chatroom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentChatMessage: '',
      channels: this.props.channels
    };
    this.createSocket = this.createSocket.bind(this);
  }


  componentDidMount() {
    this.createSocket(this.props.match.params.channelId);

  }

  componentWillMount() {
    this.props.requestChannels();
    this.props.requestUsers();
    this.props.requestMessages();
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.match.params.channelId !== nextProps.match.params.channelId) {
      const newChannelId = nextProps.match.params.channelId;
      this.createSocket(newChannelId);

      this.props.requestChannels();
      this.props.requestUsers();
      this.props.requestMessages();
    }

  }

  updateCurrentChatMessage(event) {
    this.setState({
      currentChatMessage: event.target.value
    });
  }

  createSocket(channelId) {
    let cable;
    if (process.env.NODE_ENV !== 'production') {
      cable = Cable.createConsumer('http://localhost:3000/cable');
    } else {
      cable = Cable.createConsumer('wss://zlack-la.herokuapp.com/cable');
    }
    this.chats = cable.subscriptions.create({
      channel: 'ChatChannel',
      chatroom_id: channelId
    }, {
      connected: () => {
        console.log("CONNECTED!");
      },
      disconnected: () => {
        console.log("---DISCONNECTED---");
      },
      received: (data) => {
        this.props.receiveMessage(data);
      },
      create: function(chatContent, userId, chatroomId) {
        this.perform('create', {
          body: chatContent,
          user_id: userId,
          chatroom_id: chatroomId
        });
      }
    });
  }


  handleSendEvent(event) {
    event.preventDefault();
    this.chats.create(
      this.state.currentChatMessage,
      this.props.currentUserId,
      this.props.selectedChannelId);
    this.setState({
      currentChatMessage: ''
    });
  }

  handleChatInputKeyPress(event) {
    if(event.key === 'Enter') {
      this.handleSendEvent(event);
    }
  }

  render() {
    const users = this.props.users;
    const messages = this.props.messages;
    const currentUserId = this.props.currentUserId;
    const selectedChannelId = this.props.selectedChannelId;
    const channels = this.props.channels;
    if (!channels || !users) {
      return <div />;
    }
    let selectedChannel = channels.find(c => c.id === selectedChannelId);
    let cur_messages = messages.filter(m => m.chatroom_id === selectedChannelId);

    if (!cur_messages || !selectedChannel) {
      return <div />;
    }
    if (!users[currentUserId]) {
      return <div />;
    }
    return(
      <div className='chatroom'>
        <div className='sidebar'>
          <h3>App Academy</h3>
            <i className="fa fa-circle"
              aria-hidden="true">
            </i>
          <div className='username'> {users[currentUserId].username}</div>
          <button onClick={this.props.logout}>Log Out</button>
            <ChannelListContainer channels={this.props.channels}/>
        </div>
        <div className='chatbox-nav'>
          <div className='nav-title'>#{selectedChannel.name} </div>
          <button className='info-icon'>
          </button>
        </div>


        <div className='chatbox'>
              <div className='chat-logs'>
                <ul>
                  {cur_messages.map((el, idx) => {
                    const date = new Date(el.created_at.toString());
                    const create_time = date.toLocaleString('en-US',
                     { hour: 'numeric', minute: 'numeric', hour12: true });

                    return (
                    <li key={`el-${idx}`}>
                      <div className="message-sender">
                        <img src={users[el.user_id].img_url}
                          height="40" width="40"/>
                      </div>
                      <div className="message-content">
                        <div className='chat-user'>{ users[el.user_id].username }</div>
                        <div className='chat-message'>{ el.body }</div>
                        <div className='chat-created-at'>{ create_time }</div>
                      </div>
                    </li>
                  )}
                )}
                </ul>
              </div>
              <div className="sendMsg">
                <input
                  onKeyPress={ (e) => this.handleChatInputKeyPress(e) }
                  value={ this.state.currentChatMessage }
                  onChange={ (e) => this.updateCurrentChatMessage(e) }
                  type='text'
                  placeholder='Enter your message...'
                  className='chat-input'/>
            </div>
        </div>
      </div>
    )
  }
}

export default Chatroom;
