import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { flowRight } from 'lodash';
import Checkout from './checkout.component';

export const GET_DATA = gql`
  {
    cartItems @client
    cartTotal @client
  }
`;

const CheckoutContainer = props => (
  <Checkout cartItems={props.data.cartItems} total={props.data.cartTotal} />
);

export default flowRight(
  graphql(GET_DATA)
)(CheckoutContainer);
