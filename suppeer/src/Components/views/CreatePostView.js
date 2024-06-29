import { Container } from "@mui/material";
import React from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import Navbar from "../NavBar";
import PostEditor from "../Post/PostEditor";
import Sidebar from "../Sidebar";

const CreatePostView = () => {
  return (
    <Container>
      <Navbar />
      <GoBack />
      <GridLayout left={<PostEditor />} right={<Sidebar />} />
    </Container>
  );
};

export default CreatePostView;
