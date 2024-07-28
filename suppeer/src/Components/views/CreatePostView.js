import { Container } from "@mui/material";
import React from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import PostEditor from "../Post/PostEditor";
import Sidebar from "../Sidebar";
import LeftSidebar from "../LeftSidebar";

const CreatePostView = () => {
  return (
    <Container>
      <Navbar />
      <GoBack />
      <GridLayout
      left={<LeftSidebar/>} 
      middle={<PostEditor />} 
      right={<Sidebar />} />
    </Container>
  );
};

export default CreatePostView;
