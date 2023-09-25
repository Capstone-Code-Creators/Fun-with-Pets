import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ setUserSignedIn }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if(!isEmailValid(email)) {
      alert('Invalid email format!');
      return;
    }

    try {
      const body = JSON.stringify({ firstName, lastName, username, email, password })
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body,
      });

      const data = await response.json();
      
      if (data.token && data.user) {
        const token = data.token;
        const user = data.user.id;
        localStorage.setItem('id', user)
        localStorage.setItem('token', token);
        const signin = localStorage.getItem('id')
        setUserSignedIn(signin)

        navigate('/profile');
      }else{
        console.log("Registration Failed")
      }
    } catch (error) {
      alert("Username already taken")
      console.error('Error:', error);
    }
  };

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
