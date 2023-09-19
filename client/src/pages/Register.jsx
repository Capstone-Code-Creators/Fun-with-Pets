import React from 'react';
import RegisterForm from '../components/RegisterForm';
import '../App.css';

const Register = ({ setUserSignedIn }) => {
  return (
    <section className='register-page'>
      <h2>Register</h2>
      <RegisterForm setUserSignedIn={setUserSignedIn}/>
    </section>
  );
}

export default Register;
