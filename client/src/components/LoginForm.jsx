import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'


const LogInForm = ({ setUserSignedIn }) => {

  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Attempting login...');
    try {
      const response = await fetch('/auth/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
    
      const data = await response.json();

      if(response.ok) {
          if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.tokenPayload.id)
          console.log('loginStorage token set:', localStorage.getItem('token'));
          navigate('/profile'); 
          setUserSignedIn(true);
          } else {
            console.error(`Login failed: Token not received`);
          }
      } else {
        console.error(`Login failed: ${data.message}`);
      } 
  } catch (error) {
      console.error('Error:', error);
  }
};

  return (
    <section className="login-form">

      <form onSubmit={handleSubmit}>
        <section className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </section>
        <section className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </section>
        <section className="form-group">
          <button type="submit">Login</button>
        </section>
      </form>
    </section>
  );
}

export default LogInForm;
