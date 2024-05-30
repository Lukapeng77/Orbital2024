
import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from "./suppeer_logo.webp";


function Home() {
  return (
    <div className= "container">
     <h1 className= "logo">
     <img src={logoImage} alt="SUP Peer Logo" />
      </h1>
      <h2>SUP Peer</h2>
    <p>Welcome to Our Website</p>
    <p>This is the home page. Feel free to navigate around!</p>
    <div className="auth-links">
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  </div>
  );
}

export default Home;
