import { Container } from "@mui/material";
import React from "react";
import Navbar from "../Navbar";
import '../../styles/UserProfile.css'
import Profile from "./Profile"

const UserProfile = () => {

  return (
    <Container>
    <Navbar />
    <Profile/>
  </Container>
);
};

export default UserProfile;