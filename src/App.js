import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import { HomePage } from './pages/hompage/homepage.jsx';
import ShopPage from './pages/shop/shop.jsx'
import Header from './components/header/header.jsx';

function App() {
  return (
    // <div>
    //   <HomePage></HomePage>
    // </div>
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}



export default App;
