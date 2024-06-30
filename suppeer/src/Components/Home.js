
import React from 'react';
import logoImage from "./suppeer_logo.webp";
import { Box, Typography, Container, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';  
import { Button, AppBar, Toolbar, } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ForumIcon from '@mui/icons-material/Forum';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';

function Home() {
  return (
  <Container component="main" sx={{ mt: 8, mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
    <AppBar position="static" color="primary">
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
	  <Button color="inherit" startIcon={<HomeIcon />} href="/">Home</Button>
    <Button color="inherit" startIcon={<AccountBoxOutlinedIcon />} href="/profile">User Profile</Button>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Button color="inherit" startIcon={<ForumIcon />} href="/dashboard">Explore Posts Here!</Button>
    <Button color="inherit" startIcon={<PostAddOutlinedIcon />} href="/posts/create">Create a Post!</Button>
    </Box>
    </Toolbar>
	  </AppBar> 
  <Box sx={{
    mt: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    p: 5,
    backgroundColor: 'white',
  }}> 
      <img src={logoImage} alt="SUP Peer Logo" width="200" />
      <Typography variant="h4" color="primary" gutterBottom>SUP Peer</Typography>
      <Typography variant="h6">Welcome to Our Website! </Typography>
      <Typography>This is the home page. Feel free to navigate around!</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Button><Link href="/login" color="primary">Login</Link></Button>  
      <Button><Link href="/register" color="primary">Register</Link></Button>
      </Box>
      </Box>
    </Container>
);
}

export default Home;
