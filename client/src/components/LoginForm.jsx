import React, { useState } from 'react';

const LogInForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();


    console.log(`Username: ${username}, Password: ${password}`);
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
