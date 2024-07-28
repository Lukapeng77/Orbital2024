import { Container } from "@mui/material";
import React from "react";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import PostBrowser from "../Post/PostBrowser";
import LeftSidebar from "../LeftSidebar";

const Dashboard = () => {
  return (
    <Container>
      <Navbar />
      <GridLayout
        left={<LeftSidebar/>}
        middle={<PostBrowser createPost contentType="posts" />}
        right={<Sidebar />}
      />
    </Container>
  );
};

export default Dashboard;
