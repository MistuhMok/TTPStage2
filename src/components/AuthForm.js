import React from 'react';
import { connect } from 'react-redux';

const AuthForm = props => {
  const { name, displayName, handleSubmit } = props;

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
        <input className="submit" type="submit" value={displayName} />
      </form>
    </div>
  );
};

const mapSignin = state => {
  return {
    name: 'signin',
    displayName: 'Sign In',
  };
};

const mapRegister = state => {
  return {
    name: 'register',
    displayName: 'Register',
  };
};

export const Signin = connect(mapSignin)(AuthForm);
export const Register = connect(mapRegister)(AuthForm);
