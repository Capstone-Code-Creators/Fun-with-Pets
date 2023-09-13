// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className="landing-page">
      <h1>Welcome to Our Website</h1>
      <section>
        <img src="" alt="logo" />
      </section>
      <section className="button-group">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </section>
      
    </section>
  );
}

export default Landing;
