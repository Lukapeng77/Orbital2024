
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try{
    // Perform login
    const response = await axios.post('http://localhost:3001/login', {
      username, password});
      console.log('Login successful', response.data);
      navigate('/profile/edit');
    } catch (error) {
      //setError("Login failed. Please try again.");
      console.error('Login error', error);
      alert('Failed to Login.');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3001/reset-password', { username });
      if (response.data.success) {
        setSuccess('Password reset email sent. Please check your inbox.');
      } else {
        setError('Failed to send password reset email. Please try again.');
      }
    } catch (error) {
      setError('Failed to send password reset email. Please try again.');
      console.error('Reset password error', error);
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <button type="button" onClick={handleResetPassword}>Reset Password</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
        <p>
        <Link to="/">Back to Homepage</Link>  <Link to="/forum">Go to Forum</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
