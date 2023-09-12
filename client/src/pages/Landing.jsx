// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing-page">
      <h1>Welcome to Our Website</h1>
      <div className="button-group">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Landing;
