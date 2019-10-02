import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>TTPSTAGE2</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

export default Navbar;
