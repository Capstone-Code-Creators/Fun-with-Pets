// eslint-disable-next-line no-unused-vars
import React from 'react';
import LoginForm from '../components/LoginForm'; 
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
      <Link to="./Profile">Profile</Link>
    </div>
  );
}

export default Login;
