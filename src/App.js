import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user-actions.js';

import './App.css';
import { HomePage } from './pages/hompage/homepage.jsx';
import ShopPage from './pages/shop/shop.jsx'
import Header from './components/header/header.jsx';
import SignInAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.jsx';
import { auth, createUserProfileDocument } from "./firebase/firebase.js";


class App extends React.Component {

  unSubscribedFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;

    this.unSubscribedFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });

      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unSubscribedFromAuth();
  }


  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);


// how reducer and root reducer get the user object is handled by redux internally, it is not something we can observe from our side, redux structure all this together without us seeing it

// actually saying how user reducer and root reducer get the object is a bit misleading, it is actually all reducers that will receive the action object, root reducer job simply structure all(you can combine partially) reducer together

