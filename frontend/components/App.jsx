import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import GreetingContainer from './greetings/greeting_container';
import LoginFormContainer from './session_forms/login_form_container';
import SignupFormContainer from './session_forms/signup_form_container';
import {AuthRoute} from '../util/route_util';

const homeContainer = () => {
  return (
    <div className="home">
      <div className="homePic"></div>
      <div className="homeTxt">
          <h1>Where Work Happens</h1>
          <p>When your team needs to kick off a project, hire a new employee, deploy some code, review a sales contract, finalize next year's budget, measure an A/B test, plan your next office opening, and more, Slack has you covered.</p>
          <span> </span>
    </div>
    </div>

  )
}


const App = () => (
  <div>
    <header>
       <div className='header-left'>
         <Link to="/"><div className='logo'></div></Link>
       </div>
       <div className='header-right'>
         <GreetingContainer/>
      </div>
    </header>
      <Switch>
        <Route exact path="/" component={homeContainer} />
        <AuthRoute exect path="/login" component={LoginFormContainer} />
        <AuthRoute exect path="/signup" component={SignupFormContainer} />
        <Route path='*' render={() => (<Redirect to="/" />)} />
      </Switch>
  </div>
);

export default App;
