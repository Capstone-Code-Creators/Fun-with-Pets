// eslint-disable-next-line no-unused-vars
import React from 'react';
import LoginForm from '../components/LoginForm'; 
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <section>
        <h2>Login</h2>
        <LoginForm />
      </section>
      <section>
        <h3>Need to Register?</h3>
        <Link to="/register">Register</Link>
        <Link to="/Profile">Profile</Link>
      </section>
    </>
  );
}

export default Login;
