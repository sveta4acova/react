import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import CurrentUserContext from './contexts/current-user/current-user.context';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }
  onsubscribeFromAuth = null;

  componentDidMount() {
    //подписываемся на изменения (логирование, разлогирование, регистрация)
    this.onsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }});
        })
      } else {
        this.setState({currentUser: userAuth});
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
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Header/>
        </CurrentUserContext.Provider>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/shop" component={ShopPage}/>
          <Route path="/checkout" component={CheckoutPage}/>
          <Route exact path="/signin" render={() => {
            return (
              this.state.currentUser ?
                (<Redirect to="/" />) :
                (<SignInAndSignUpPage/>)
            )
          }}/>
        </Switch>
      </div>
    );
  }
}

export default App;
