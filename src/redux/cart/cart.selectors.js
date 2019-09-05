import {createSelector} from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems,
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden,
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => {
    console.log('calculated cartItems count');
    return cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0);
  },
);