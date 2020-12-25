import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Admin from './components/admin';
import Remote from './components/remote';
import Watch from './components/watch';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/admin' component={Admin} />
          <Route path='/remote' component={Remote} />
          <Route path='/watch' component={Watch} />
          <Redirect to='/remote' />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
