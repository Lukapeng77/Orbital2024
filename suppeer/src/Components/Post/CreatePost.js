import { AddCommentOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      size="medium"
      onClick={() => navigate("/posts/create")}
      sx={{
        gap: "0.2rem",
        whiteSpace: "nowrap",
      }}
    >
      <AddCommentOutlined style={{ flexShrink: 0 }} />
      <span>New Post</span>
    </Button>
  );
};

export default CreatePost;
