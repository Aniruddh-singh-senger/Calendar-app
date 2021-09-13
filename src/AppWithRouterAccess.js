import Scheduler from './Scheduler'
import Login from './Account/Login';

import { oktaAuthConfig, oktaSignInConfig } from './config';
import { Route, useHistory, Switch } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';


const oktaAuth = new OktaAuth(oktaAuthConfig);

function AppWithRouterAccess() {
    const history = useHistory();
    const customAuthHandler = () => {
        history.push('/login');
      };
    
      const restoreOriginalUri = async (_oktaAuth, originalUri) => {
        history.replace(toRelativeUrl(originalUri, window.location.origin));
      };

  return (
    <Security
    oktaAuth={oktaAuth}
    onAuthRequired={customAuthHandler}
    restoreOriginalUri={restoreOriginalUri}
  >
    <div className="App">
    <SecureRoute path='/' component={Scheduler} />
      <Switch>
      <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
      <Route path='/login/callback' component={LoginCallback} />
      </Switch>
   
     
    </div>
    </Security>
  );
}

export default AppWithRouterAccess;