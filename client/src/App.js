import React, {useEffect, lazy, Suspense} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectCurrentUser} from './redux/user/user.selectors';
import Header from './components/header/header.component';
import {checkUserSession} from './redux/user/user.actions';
import { GlobalStyle } from './global.styles';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));

function App({ checkUserSession, currentUser }){
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header/>
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<div>...Loading</div>}>
            <Route exact path="/" component={HomePage}/>
            <Route path="/shop" component={ShopPage}/>
            <Route path="/checkout" component={CheckoutPage}/>
            <Route exact path="/signin" render={() => {
              return (
                currentUser ?
                  (<Redirect to="/" />) :
                  (<SignInAndSignUpPage/>)
              )
            }}/>
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
