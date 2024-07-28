import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import PostBrowser from "../Post/PostBrowser";
import Sidebar from "../Sidebar";
import LeftSidebar from "../LeftSidebar";

const SearchView = () => {
  return (
    <Container>
      <Navbar />
      <GridLayout
        left={<LeftSidebar />}
        middle={
          <Stack spacing={2}>
            <PostBrowser createPost contentType="posts" />
          </Stack>
        }
        right={<Sidebar />}
      />
    </Container>
  );
};

export default SearchView;
