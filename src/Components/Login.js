
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

    try{
    // Perform login
    const response = await axios.post('http://localhost:3001/login', {
      username, password});
      console.log('Login successful', response.data);
      navigate('/profile');
       /*     method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        const data = await response.json();  // Assuming the backend sends JSON response
    // Here you'd typically check credentials against your backend

    // Simulate successful login:
    if(response.ok){
    setSuccess("Login successful!");
    setTimeout(() => {
      navigate('/home');  // Redirects user to a home page or dashboard after login
    }, 2000);  // Delays navigation for 2 seconds to allow user to see success message
    }else{
       throw new Error(data.message || "Login failed. Please try again.");
    }*/
    } catch (error) {
      //setError("Login failed. Please try again.");
      console.error('Login error', error);
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
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
        <p>
        <Link to="/">Back to Homepage</Link>  <Link to="/forum">Go to Forum</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
