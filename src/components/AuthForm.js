import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../reducers/index';

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;
  return (
    <div className="authform">
      <h1>{displayName}</h1>
      <form onSubmit={handleSubmit} name={name}>
        {displayName === 'Register' ? (
          <input name="userName" type="name" placeholder="name" />
        ) : (
          ''
        )}
        <input name="email" type="email" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button className="submit" type="submit">
          {displayName}
        </button>
        {error && error.response && (
          <div className="error">
            {' '}
            <div>Alert!</div>
            {error.response.data}{' '}
          </div>
        )}
      </form>
    </div>
  );
};

const mapSignin = state => {
  return {
    name: 'signin',
    displayName: 'Sign In',
    error: state.user.error,
  };
};

const mapRegister = state => {
  return {
    name: 'register',
    displayName: 'Register',
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value.toLowerCase();
      const password = evt.target.password.value;
      let name;
      if (evt.target.name === 'register') name = evt.target.userName.value;

      dispatch(auth(email, password, formName, name));
    },
  };
};

export const Signin = connect(
  mapSignin,
  mapDispatch
)(AuthForm);
export const Register = connect(
  mapRegister,
  mapDispatch
)(AuthForm);
