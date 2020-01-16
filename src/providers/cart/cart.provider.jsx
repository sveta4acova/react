import React, { createContext, useState, useEffect } from 'react';
import { addItemToCart, removeItemFromCart, getCartItemsCount, getCartTotal } from './cart.utils';

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0,
  total: 0,
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [total, setTotal] = useState(0);

  const addItem = item => setCartItems(addItemToCart(cartItems, item));
  const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
  const clearItemFromCart = item => setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
  const toggleHidden = () => setHidden(!hidden);

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
    setTotal(getCartTotal(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ hidden, cartItems, cartItemsCount, total, addItem, toggleHidden, removeItem, clearItemFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
