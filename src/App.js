import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {setCurrentUser} from './redux/user/user.actions';
import './App.css';

class App extends React.Component {
  onsubscribeFromAuth = null;

  componentDidMount() {
    //подписываемся на изменения (логирование, разлогирование, регистрация)
    this.onsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const {setCurrentUser} = this.props;

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        })
      } else {
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount() {
    //отписка
    //onAuthStateChanged возвращает функцию, вызвав которую мы удаляем слушатель событий авторизации
    this.onsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/shop" component={ShopPage}/>
          <Route exact path="/signin" render={() => {
            return (
              this.props.currentUser ?
                (<Redirect to="/" />) :
                (<SignInAndSignUpPage/>)
            )
          }}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
