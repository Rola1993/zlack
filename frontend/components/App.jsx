import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import GreetingContainer from './greetings/greeting_container';
import ChatroomContainer from './chatrooms/chatroom_container';
import ChannelCreateContainer from './channels/channel_create_container';
import DmCreateContainer from './channels/dm_create_container';
import WorkspacesListContainer from './workspaces/workspaces_list_container';
import LoginFormContainer from './session_forms/login_form_container';
import SignupFormContainer from './session_forms/signup_form_container';
import {AuthRoute, ProtectedRoute} from '../util/route_util';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';


library.add(faPlusCircle, faInfoCircle);

const homeContainer = () => {
  return (
    <div>
      <header>
         <div className='header-left'>
           <Link to="/"><div className='logo'></div></Link>
         </div>
         <div className='header-right'>
           <GreetingContainer/>
        </div>
      </header>
      <div className="home">
        <div className="homePic"></div>
        <div className="homeTxt">
            <h1>Where Work Happens</h1>
            <p>When your team needs to kick off a project, hire a new employee, deploy some code, review a sales contract, finalize next year's budget, measure an A/B test, plan your next office opening, and more, Slack has you covered.</p>
            <Link to="/signup"><button>GET STARTED</button></Link>
            <div className="p2">Already using zlack? <Link to="/login">Sign in</Link></div>
        </div>
      </div>
  </div>
  )
}


const App = () => (
  <div>
      <Switch>
        <AuthRoute exect path="/login" component={LoginFormContainer} />
        <AuthRoute exect path="/signup" component={SignupFormContainer} />
        <ProtectedRoute exact path="/workspaces" component={WorkspacesListContainer} />
        <ProtectedRoute exect path="/channels/new" component={ChannelCreateContainer} />
        <ProtectedRoute exect path="/dms/new" component={DmCreateContainer} />
        <ProtectedRoute exact path="/channels/:channelId" component={ChatroomContainer} />
        <Route exact path="/" component={homeContainer} />
        <Route path='*' render={() => (<Redirect to="/" />)} />
      </Switch>
  </div>
);

export default App;
