import React from 'react';
import {connect} from 'react-redux';
import './custom-button.styles.scss';

const CustomButton = ({children, isGoogleSignIn, inverted, ...otherProps}) => {
  console.log('render customButton');
  return (
    <button className={`custom-button ${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''}`} {...otherProps}>
      {children}
    </button>
  );
};

export default connect()(CustomButton);