import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100; //in cents
  const publishableKey = 'pk_test_7owdiRfoKIZ2kR5URlCRsTUu00JIRYzDVQ';

  const onToken = token => {
    console.log(token)
    alert('Payment Successful');
  };

  return <StripeCheckout
    label="Pay Now"
    name="CRWN Clothing Ltd."
    billingAddress
    shippingAddress
    image="https://svgshare.com/i/CUz.svg"
    description={`Your total is $${price}`}
    amount={priceForStripe}
    panelLabel="Pay Now"
    token={onToken}
    stripeKey={publishableKey}
  />
};

export default StripeCheckoutButton;
