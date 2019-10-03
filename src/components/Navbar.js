import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../reducers';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>TTPSTAGE2</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          <Link to="/home">Portfolio</Link>
          <Link to="/Transactions">Transactions</Link>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <Link to="/signin">Sign In</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(Navbar);
