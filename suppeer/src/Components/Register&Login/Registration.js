
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Link, Box } from '@mui/material';
import Copyright from '../Copyright';

function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    //Simple validation to check if password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Simulate API call
    axios.post('http://localhost:3001/api/register', { username, email, password })
      .then(res => {
        setSuccess("User created successfully!")
        navigate('/login');
      }).catch(error => setError(error.message || "Failed to register.")) 
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 3,
        p: 3,
        backgroundColor: 'white',
        borderRadius: 2
      }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {success && <Typography sx={{ color: 'green', mb: 1 }}>{success}</Typography>}
        {error && <Typography sx={{ color: 'red', mb: 1 }}>{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
            Already have an account? <Link href="/login" variant="body2" sx={{ color: '#007bff', textDecoration: 'none' }}>Login here</Link>
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
            <Link href="/" 
             variant="body2" 
             sx={{ color: '#007bff', textDecoration: 'none' }}
          >
            Back to Homepage
            </Link>
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Copyright />
        </Box>
      </Box>
    </Container>
  );
}

export default Registration;
