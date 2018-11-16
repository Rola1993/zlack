
# Zlack

### [Live Demo](https://zlack-la.herokuapp.com/#/)

## Introduction

This is a app clone which has basic features of Slack. Users can do live chat in the chatroom. They can create new channels for all users. They can also form a group chat for certain users.

![homepage](https://github.com/Rola1993/zlack/blob/master/app/assets/images/homepage.png)

When creating a new group chat, only users who are selected would be able to subscribe to and see that conversation. 

![createdm](https://github.com/Rola1993/zlack/blob/master/app/assets/images/create-dm.png)

![livechat](https://github.com/Rola1993/zlack/blob/master/app/assets/images/livechat.png)
 
 ## Code Snippets for Core Features
 
 ### Real Time Messaging
 
 It uses 'ActionCable' to realize live chat. Everytime when the current user switches to a chatroom, the Cable.createConsumer() function would set up a WebSocket connection to the Rails server. Then the subscription.create() opens a ChatChannel for that specific chatroom id. 
 
 ```javascript 
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
 ```
This ChatChannel has a callback function create() which takes in message body, user and chatroom it belongs to and generates a new message instance to database.
 
 ```javascript
 class ChatChannel < ApplicationCable::Channel
   def subscribed
     stream_from "chat-#{params['chatroom_id']}:messages"
   end

   def unsubscribed; end

   def create(opts)
     Message.create(
       body: opts.fetch('body'),
       user_id: opts.fetch('user_id'),
       chatroom_id: opts.fetch('chatroom_id').to_i
     )
   end
 end
 ```
 
It also lets the ActionCable server to broadcast the new message information back. This ChatChannel's callback function received() would obtain the data and update the component's props to show the new message instantly.
 
 ```javascript
 class MessageCreationEventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)

    ActionCable
      .server
      .broadcast("chat-#{message.chatroom_id}:messages",
                 id: message.id,
                 created_at: message.created_at,
                 body: message.body,
                 user_id: message.user_id,
                 chatroom_id: message.chatroom_id)
    end
  end
 ```
 
 ### Many to Many Relationships between Users and Channels.
 
 For implementing the user subscription to group chat, I put a array which holds selected users' ids in the state of direct message component. When the current user click the button to submit the form for creating new group chat, it would trigger the event to use this state's data as params for generating new direct message conversation instance.
 
```javascript
constructor(props) {
  ...
    this.state = {
      name: currentUser.username,
      is_dm: true,
      user_ids: [currentUser.id]
    };
  ...
}
```

Here it lists all the users except for the current user as select options. When the current user clicks an option, it would trigger the function called 'selectUser'.

```javascript
render() {
  ...
  return (
    ...
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
    ...
  );
}
```

In the initial state, it contains the name of the current user. In the selectUser function, it would concat other selected users' names as the 'Direct Messages' feature requires. The user_ids also includes the current user's id at the beginning, because the current user is always subscribed to the new group chat he/she creates. selectUser would add other users's ids into the array.  

```javascript

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
  
```
