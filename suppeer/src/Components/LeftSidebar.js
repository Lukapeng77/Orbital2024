import { Stack } from "@mui/material";
import React, { useState } from "react";
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
