import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user-actions.js';
import { selectCurrentUser } from './redux/user/user-selector.js';

import './App.css';
import { HomePage } from './pages/hompage/homepage.jsx';
import ShopPage from './pages/shop/shop.jsx'
import Header from './components/header/header.jsx';
import SignInAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.jsx';
import CheckoutPage from './pages/checkout/checkout.jsx';

import { auth, createUserProfileDocument } from "./firebase/firebase.js";

import { selectCollectionsPreview } from './redux/shop/shop-selectors';
import collection from './pages/collection/collection.jsx';


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

      }
      setCurrentUser(userAuth);
      // addCollectionsAndDocuments('collection', collectionsArray.map(({ title, items }) => ({ title, items })));

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
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin'
            render={() =>
              this.props.currentUser ? (<Redirect to='/' />) :
                (<SignInAndSignUpPage />)
            } />
          <Route exact path='/checkout' component={CheckoutPage} />

        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


// how reducer and root reducer get the user object is handled by redux internally, it is not something we can observe from our side, redux structure all this together without us seeing it

// actually saying how user reducer and root reducer get the object is a bit misleading, it is actually all reducers that will receive the action object, root reducer job simply structure all(you can combine partially) reducer together

