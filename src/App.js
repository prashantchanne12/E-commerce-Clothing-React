import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import { HomePage } from './pages/hompage/homepage.jsx';
import ShopPage from './pages/shop/shop.jsx'
import Header from './components/header/header.jsx';
import SignInAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.jsx';
import { auth } from "./firebase/firebase.js";


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    }
  }

  unSubscribedFromAuth = null;

  componentDidMount() {
    this.unSubscribedFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unSubscribedFromAuth();
  }


  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}



export default App;
