import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { flowRight } from 'lodash';

import CartIcon from './cart-icon.component';

//toggleCartHidden - это функция, которая будет взята с клиентской части (из стореджа)
//мы ее определили в resolvers
const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
      toggleCartHidden @client
    }
`;
const GET_ITEMS_COUNT = gql`
  {
    itemsCount @client
  }
`;

const CartIconContainer = props => {
  const { data: { itemsCount }, toggleCartHidden } = props;
  return <CartIcon toggleCartHidden={toggleCartHidden} itemsCount={itemsCount} />;
};

export default flowRight(
  graphql(GET_ITEMS_COUNT),
  //по умолчанию в пропс попадет объект mutate, но если передать конфиг, то сразу получим toggleCartHidden
  graphql(TOGGLE_CART_HIDDEN, {name: 'toggleCartHidden'})
)(CartIconContainer);
