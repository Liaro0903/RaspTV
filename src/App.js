import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Watch from './components/watch';
import Remote from './components/remote';
import Admin from './components/admin';
import axios from 'axios';
import { baseURL } from './constants';

function App() {
  
  const [watch, setWatch] = useState('4ZVUmEUFwaY');

  const getActive = async () => {
    try {
      const response = await axios.get(`${baseURL}active`);
      setWatch(response.data.url);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    //getActive();
  }, []);
  
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/watch' component={() => <Watch videoId={watch}/>} />
          <Route path='/admin' component={Admin} />
          <Route path='/remote' component={Remote} />
          <Redirect to='/remote' />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
