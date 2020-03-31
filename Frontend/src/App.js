import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Watch from './components/watch';
import Remote from './components/remote';
import Admin from './components/admin';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/watch' component={Watch} />
          <Route path='/admin' component={Admin} />
          <Route path='/remote' component={Remote} />
          <Redirect to='/remote' />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
