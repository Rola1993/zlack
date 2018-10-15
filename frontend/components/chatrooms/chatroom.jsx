import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import Cable from 'actioncable';

class Chatroom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentChatMessage: '',
      chatLogs: []
    };

  }

  componentDidMount() {
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
    let userId = this.props.currentUserId;
    let cable = Cable.createConsumer('ws://localhost:3000/cable');
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
    return this.state.chatLogs.map((el) => {
      return (
        <li key={`chat_${el.id}`}>
          <img src={users[el.user_id].img_url}/>
          <span className='chat-user'>{ users[el.user_id].username }</span>
          <span className='chat-message'>{ el.body }</span>
          <span className='chat-created-at'>{ el.created_at }</span>
        </li>
      );
    });
  }

  handleSendEvent(event) {
    event.preventDefault();
    this.chats.create(this.state.currentChatMessage, 1);
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
    window.messages = messages;
    window.users = users;

    return(
      <div className='chatroom'>
        <div className='sidebar'>
          <h3>App Academy</h3>
        </div>

        <div className='chatbox'>
              <div className='chat-logs'>
                <ul>
                  {messages.map((el, idx) => {

                    return (
                    <li key={`el-${idx}`}>
                      <img src={users[el.user_id].img_url}/>
                      <span className='chat-user'>{ users[el.user_id].username}</span>
                      <span className='chat-message'>{ el.body }</span>
                      <span className='chat-created-at'>{ el.created_at }</span>
                    </li>
                  )}
                )}
                </ul>
                { this.renderChatLog() }
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
