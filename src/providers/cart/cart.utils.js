export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
    )
  }

  return [...cartItems, {...cartItemToAdd, quantity: 1}];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(item => item.id === cartItemToRemove.id);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(item => item.id !== existingCartItem.id);
  }

  return cartItems.map(item => (
    item.id === existingCartItem.id ?
      {...item, quantity: item.quantity - 1} :
      item
  ))
};

export const getCartItemsCount = cartItems => {
  return cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0)
};

export const getCartTotal = cartItems => {
  return cartItems.reduce((accumalatedQuantity, cartItem) => accumalatedQuantity + (cartItem.quantity * cartItem.price), 0);
};
