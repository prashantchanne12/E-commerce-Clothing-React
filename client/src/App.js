import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { checkUserSession } from './redux/user/user-actions';
import { selectCurrentUser } from './redux/user/user-selector';

import { GlobalStyle } from './global-styles';

// import './App.css';
import Header from './components/header/header.jsx';

import Spinner from './components/spinner/spinner-component';
import ErrorBoundry from './components/error-boundry/error-boundry'
// HomePage is lazy loaded
// That means whenever application mounts for the first time it will get the chunk that represents only the HomePage.
const HomePage = lazy(() => import('./pages/hompage/homepage'));
const ShopPage = lazy(() => import('./pages/shop/shop'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-sign-up/sign-in-sign-up'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout'));


const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  // Suspense - allows you to wrap any part of your application that might be rendering asynchronous components . It actually meant to used with react lazy.

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundry>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/signin'
              render={() =>
                currentUser ? (<Redirect to='/' />) :
                  (<SignInAndSignUpPage />)
              } />
            <Route exact path='/checkout' component={CheckoutPage} />
          </Suspense>
        </ErrorBoundry>
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

