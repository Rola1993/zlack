import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';
import GreetingContainer from '../greetings/greeting_container';


class WorkspacesList extends React.Component {

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this.props.requestWorkspaces();
  }

  render() {
    return(
      <div>
        <header>
           <div className='header-left'>
             <Link to="/"><div className='logo'></div></Link>
           </div>
           <div className='header-right'>
             <GreetingContainer/>
          </div>
        </header>
        <div className="session">
          <form>
            <h3>Sign in to your workspace</h3>
            <label>Choose a workspace below</label>
            <br></br>
            <br></br>
              <p>
                {this.props.workspaces[0].name}
              </p>
              <Link to="/chatroom">
                <input type="submit" value="Continue ->" />
              </Link>
          </form>
        </div>
    </div>
    )
  }
}

export default WorkspacesList;
