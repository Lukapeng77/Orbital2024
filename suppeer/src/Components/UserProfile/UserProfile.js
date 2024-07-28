import { Container } from "@mui/material";
import React, { useState } from "react";
import NavBar from "../Navbar";
import '../../styles/UserProfile.css'
import Profile from "./Profile"

const UserProfile = () => {

  return (
    <Container>
    <NavBar />
    <Profile/>
  </Container>
);
};

export default UserProfile;