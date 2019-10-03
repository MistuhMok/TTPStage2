import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../reducers/index';

const AuthForm = props => {
  console.log(props, 'authform');

  const { name, displayName, handleSubmit, error } = props;
  return (
    <div className="authform">
      <h1>{displayName}</h1>
      <form onSubmit={handleSubmit} name={name}>
        {displayName === 'Register' ? (
          <input name="name" type="name" placeholder="name" />
        ) : (
          ''
        )}
        <input name="email" type="email" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button className="submit" type="submit">
          {displayName}
        </button>
        {error && error.response && (
          <div className="error"> {error.response.data} </div>
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
  console.log('does this run?');
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      console.log(email, password, formName, 'map dispatch');
      dispatch(auth(email, password, formName));
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
