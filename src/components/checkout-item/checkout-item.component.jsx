import React, {useContext} from 'react';
import { CartContext } from '../../providers/cart/cart.provider';
import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}) => {
  const {imageUrl, name, quantity, price} = cartItem;
  const { addItem, removeItem, clearItemFromCart } = useContext(CartContext);

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item"/>
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <span className="arrow" onClick={() => removeItem(cartItem)}>&#10094;</span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={() => addItem(cartItem)}>&#10095;</span>
      </div>
      <span className="price">{price}</span>
      <button className="remove-button" onClick={() => clearItemFromCart(cartItem)}>&#10005;</button>
    </div>
  );
};

export default CheckoutItem;
