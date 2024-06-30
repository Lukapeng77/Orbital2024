import { Container } from "@mui/material";
import React from "react";
import GridLayout from "../GridLayout";
import Navbar from "../NavBar";
import Sidebar from "../Sidebar";
import PostBrowser from "../Post/PostBrowser";

const Dashboard = () => {
  return (
    <Container>
      <Navbar />
      <GridLayout
        left={<PostBrowser createPost contentType="posts" />}
        right={<Sidebar />}
      />
    </Container>
  );
};

export default Dashboard;
