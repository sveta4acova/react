import React from 'react';
import {connect} from 'react-redux';

import {toggleCartHidden} from '../../redux/cart/cart.actions';
import {selectCartItemsCount} from '../../redux/cart/cart.selectors';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = ({toggleCartHidden, itemCount}) => {;
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon"/>
      <span className="item-count">{itemCount}</span>
    </div>
  )
};

// в результате этого кода каждый раз будет пересчитываться значение itemCount
// поэтому тут нужен селектор, который будет предотвращать повторные вычисления, если аргументы не изменились
// хотя можно было просто itemCount считать при удалении/добавлении товаров в корзину и хранить в стейте
// в результате этого мы также избежали бы лишних расчетов
// const mapStateToProps = ({cart: {cartItems}}) => {
//   return {
//     itemCount: cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0),
//   }
// };

const mapStateToProps = state => ({
  itemCount: selectCartItemsCount(state),
  // hidden: state.cart.hidden,
});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
