import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { getPosts } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import FindUsers from "./FindUsers";
import Footer from "./Footer";
import Loading from "./Loading";
import PostCard from "./Post/PostCard";
import TopPosts from "./Post/TopPosts";
import { SidePostCommunity } from "./community/side-post-community";
import { TopCommunities } from "./community/top-communities";

const Sidebar = () => {
  return (
    <Stack gap={3}>
        <SidePostCommunity /> 
        <TopCommunities />
    </Stack>
  );
};

export default Sidebar;
