import { Container } from "@mui/material";
import React, { useState } from "react";
import NavBar from "../NavBar";
import '../../styles/UserProfile.css'
import Profile from "./Profile"

const AddProfile = () => {

  return (
    <Container>
    <NavBar />
    <Profile/>
  </Container>
);
};

export default AddProfile;