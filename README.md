
# zlack

### [Live Demo](https://zlack-la.herokuapp.com/#/)

### Introduction

This is a app clone which has basic features of Slack. Users can do live chat in the chatroom. They can create new channels for all users. They can also form a group chat for certain users.

![homepage](https://github.com/Rola1993/zlack/blob/master/app/assets/images/homepage.png)

When creating a new group chat, only users who are selected would be able to subscribe to and see that conversation. 

![createdm](https://github.com/Rola1993/zlack/blob/master/app/assets/images/create-dm.png)

![livechat](https://github.com/Rola1993/zlack/blob/master/app/assets/images/livechat.png)
 
 ### Code snippets
 
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
