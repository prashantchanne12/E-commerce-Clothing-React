import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { checkUserSession } from './redux/user/user-actions';
import { selectCurrentUser } from './redux/user/user-selector';

import { GlobalStyle } from './global-styles';

// import './App.css';
import { HomePage } from './pages/hompage/homepage.jsx';
import ShopPage from './pages/shop/shop.jsx'
import Header from './components/header/header.jsx';
import SignInAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.jsx';
import CheckoutPage from './pages/checkout/checkout.jsx';


const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/signin'
          render={() =>
            currentUser ? (<Redirect to='/' />) :
              (<SignInAndSignUpPage />)
          } />
        <Route exact path='/checkout' component={CheckoutPage} />

      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispacthToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});


export default connect(mapStateToProps, mapDispacthToProps)(App);


// how reducer and root reducer get the user object is handled by redux internally, it is not something we can observe from our side, redux structure all this together without us seeing it

// actually saying how user reducer and root reducer get the object is a bit misleading, it is actually all reducers that will receive the action object, root reducer job simply structure all(you can combine partially) reducer together

