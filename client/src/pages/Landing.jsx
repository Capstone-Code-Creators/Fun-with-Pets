// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


const Landing = () => {
  return (
    <section className="landing-page">
      <h1>Welcome to Our Website</h1>
      <section>
        <img src="" alt="logo" />
      </section>
      <section className='landing-links'>
        <Link id='login-link' to="/login">Login</Link>
        <Link id='register-link' to="/register">Register</Link>
      </section>
    </section>
  );
}

export default Landing;
