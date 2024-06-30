import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import FindUsers from "./FindUsers";
import TopPosts from "./Post/TopPosts";

const Sidebar = () => {
  return (
    <Stack spacing={2}>
      <TopPosts />
      <FindUsers />
    </Stack>
  );
};

export default Sidebar;
