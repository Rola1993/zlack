import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import Cable from 'actioncable';
import moment from 'moment';

class Chatroom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentChatMessage: '',
      chatLogs: []
    };
  }

  componentDidMount() {
    this.props.requestUsers();
    this.props.requestChannels();
    this.props.requestMessages();
  }

  componentWillMount() {
    this.createSocket();
  }

  updateCurrentChatMessage(event) {
    this.setState({
      currentChatMessage: event.target.value
    });
  }

  createSocket() {
    let cable;
    if (process.env.NODE_ENV !== 'production') {
      cable = Cable.createConsumer('http://localhost:3000/cable');
    } else {
      cable = Cable.createConsumer('https://zlack-la.herokuapp.com/cable');
    }
    this.chats = cable.subscriptions.create({
      channel: 'ChatChannel'
    }, {
      connected: () => {},
      received: (data) => {
        let chatLogs = this.state.chatLogs;
        chatLogs.push(data);
        this.setState({ chatLogs: chatLogs });
      },
      create: function(chatContent, userId) {
        this.perform('create', {
          body: chatContent,
          user_id: userId
        });
      }
    });
  }

  renderChatLog() {
    const users = this.props.users;
    return this.state.chatLogs.map((el, idx) => {
      return (
        <li key={`el-${idx}`}>
          <div className="message-sender">
            <img src={users[el.user_id].img_url}
              height="40" width="40"/>
          </div>
          <div className="message-content">
            <div className='chat-user'>{ users[el.user_id].username}</div>
            <div className='chat-message'>{ el.body }</div>
            <div className='chat-created-at'>{ el.created_at }</div>
          </div>
        </li>
      );
    });
  }

  handleSendEvent(event) {
    event.preventDefault();
    this.chats.create(this.state.currentChatMessage, this.props.currentUserId);
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
    const channels = this.props.channels;
    window.messages = messages;
    window.users = users;

    return(
      <div className='chatroom'>
        <div className='sidebar'>
          <h3>App Academy</h3>
          <ul>
            {channels.map((channel, idx) => (
              <li key={`channel-${idx}`}>
                {channel.name}
              </li>
            ))}
          </ul>
        </div>

        <div className='chatbox'>
              <div className='chat-logs'>
                <ul>
                  {messages.map((el, idx) => {

                    return (
                    <li key={`el-${idx}`}>
                      <div className="message-sender">
                        <img src={users[el.user_id].img_url}
                          height="40" width="40"/>
                      </div>
                      <div className="message-content">
                        <div className='chat-user'>{ users[el.user_id].username}</div>
                        <div className='chat-message'>{ el.body }</div>
                        <div className='chat-created-at'>{ el.created_at }</div>
                      </div>
                    </li>
                  )}
                )}
                  { this.renderChatLog() }
                </ul>
              </div>
              <input
                onKeyPress={ (e) => this.handleChatInputKeyPress(e) }
                value={ this.state.currentChatMessage }
                onChange={ (e) => this.updateCurrentChatMessage(e) }
                type='text'
                placeholder='Enter your message...'
                className='chat-input'/>
        </div>
      </div>
    )
  }
}

export default Chatroom;
