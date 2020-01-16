import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import CurrentUserContext from '../../contexts/current-user/current-user.context';
import { CartContext } from '../../providers/cart/cart.provider';
import './header.styles.scss';

const Header = () => {
  const currentUser = useContext(CurrentUserContext);
  const { hidden } = useContext(CartContext);

  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" title="crown" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">SHOP</Link>
        <Link className="option" to="/contact">CONTACT</Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
        ) : (
          <Link className="option" to="/signin">SIGN IN</Link>
        )}
        <CartIcon/>
      </div>
      {!hidden && <CartDropdown/>}
    </div>
  );
};

export default Header;
