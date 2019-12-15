import React, {useState} from 'react';
import {connect} from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'
import './sign-in.styles.scss';

function SignIn({googleSignInStart, emailSignInStart}) {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const {email, password} = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    await emailSignInStart(email, password);
    setUserCredentials({ email: '', password: ''});
  };

  const handleChange = event => {
    const {value, name} = event.target;
    setUserCredentials({...userCredentials, [name]: value});
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          handleChange={handleChange}
          type="email"
          name="email"
          value={email}
          label="Email"
          required
        />
        <FormInput
          handleChange={handleChange}
          type="password"
          name="password"
          value={password}
          label="Password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign in with Google</CustomButton>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password})),
});

export default connect(null, mapDispatchToProps)(SignIn);
