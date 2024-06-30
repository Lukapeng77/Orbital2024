
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { loginUser } from '../../helpers/authHelper';
import { Container, TextField, Button, Typography, Link, Box } from '@mui/material';
import Copyright from '../Copyright';

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

    // Perform login opration 
    axios.post('http://localhost:3001/api/login', {username, password})
      .then(res => {
      console.log('Login successful', res.data);
      loginUser(res.data);
      navigate('/dashboard')
    })
  .catch (error =>
      //console.log('Login error', error)
      alert("Failed to login!"))
    
  }


  return (
    <Container component="main" maxWidth="xs">
    <Box sx={{
      marginTop: 12,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: 5,
      p: 5,
      backgroundColor: 'white',
      borderRadius: 2
    }}>
      <Typography component="h1" variant="h5">
        Login
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
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
        <Typography 
        variant="body2" 
        color="textSecondary" 
        align="center" 
        sx={{ mt: 2 }}
        >
          Don't have an account? 
          <Link href="/register" 
          variant="body2" 
          sx={{ color: '#007bff', textDecoration: 'none', marginLeft: '0.5rem' }}
          >
            Register here
            </Link>
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

export default Login;
