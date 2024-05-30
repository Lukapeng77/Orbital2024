
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // State to store error messages
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform registration
    // Here you would typically handle the registration logic.

    // Reset error state on new submission
    setError('');

    // Example: Simple validation to check if password and confirm password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Simulate API call
    try{
    // Here you would typically make an API request to your backend
    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess("Registration successful! Please log in.");
      navigate('/login'); // Redirects user to the login page
    } else {
      throw new Error(data.message || "Failed to register.");
    }
    // If there was an error:
    // throw new Error("An error occurred during registration");
    }catch (error) {
      // Set error message from the catch block or error response
      setError(error.message || "Failed to register.");
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit">Register</button>
      {success ? <p>Go to <Link to="/login"></Link></p> : <p>Already have an account?<Link to = "/login"> Login here</Link></p>}
      <p>
      <Link to="/">Back to Homepage</Link> <Link to="/forum">Go to Forum</Link>
      </p>
    </form>
    </div>
  );
}

export default Registration;
