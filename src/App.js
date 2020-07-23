import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import { HomePage } from './pages/hompage/homepage.jsx';

function App() {
  return (
    // <div>
    //   <HomePage></HomePage>
    // </div>
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/hats' component={HatsPage} />
      </Switch>
    </div>
  );
}

const HatsPage = () => (
  <div>
    <h1> HATS PAGE </h1>
  </div>
);


export default App;
