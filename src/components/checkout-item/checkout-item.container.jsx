import React from "react";
import { graphql } from "react-apollo";
import { flowRight } from "lodash";
import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CLEAR_ITEM_FROM_CART
} from "../../graphql/reducers";

import CheckoutItem from "./checkout-item.component";

const CheckoutItemContainer = props => {
  const { cartItem, addItemToCart, removeItemFromCart, clearItemFromCart } = props;
  return (
    <CheckoutItem
      cartItem={cartItem}
      addItem={() => addItemToCart({ variables: { item: cartItem } })}
      removeItem={() => removeItemFromCart({ variables: { item: cartItem } })}
      clearItem={() => clearItemFromCart({ variables: { item: cartItem } })}
    />
  );
};

export default flowRight(
  graphql(ADD_ITEM_TO_CART, { name: 'addItemToCart' }),
  graphql(REMOVE_ITEM_FROM_CART, { name: 'removeItemFromCart' }),
  graphql(CLEAR_ITEM_FROM_CART, { name: 'clearItemFromCart' }),
)(CheckoutItemContainer);
