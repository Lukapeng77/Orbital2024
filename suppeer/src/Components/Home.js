
import React from 'react';
import logoImage from "./suppeer_logo.webp";
import { Box, Typography, Container, Link } from '@mui/material';
//import { useAuth } from './AuthContext';  

function Home() {
  //const { user, logout } = useAuth(); 

  return (
  <Container component="main" sx={{ mt: 8, mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: 5,
    backgroundColor: 'white',
    borderRadius: 3,
    boxShadow: 3
  }}> 
      <img src={logoImage} alt="SUP Peer Logo" width="120" />
      <Typography variant="h4" color="primary" gutterBottom>SUP Peer</Typography>
      <Typography variant="h6">Welcome to Our Website! </Typography>
      <Typography>This is the home page. Feel free to navigate around!</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Link href="/login" color="primary">Login</Link>  <Link href="/register" color="primary">Register</Link>
      </Box>
      </Box>
    </Container>
);
}

export default Home;
