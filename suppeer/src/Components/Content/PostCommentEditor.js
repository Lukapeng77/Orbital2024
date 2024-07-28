import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

const ContentUpdateEditor = (props) => {
  const [title, setTitle] = useState(props.originalTitle);
  const [content, setContent] = useState(props.originalContent);
  /*const [form, setForm] = useState({
    title: post?.title || "",
    content: post?.content || "",
  });*/
  const [error, setError] = useState("");
  //const user = isLoggedIn();
  /*const onChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };*/
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    else if (name === 'content') setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const title = e.target.title.value;
    const content = e.target.content.value;
    let error = null;

    if (props.validate) {
      error = props.validate(title, content);
    }

    if (error && error.length !== 0) {
      setError(error);
    } else {
      props.handleSubmit(e);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack>
      <TextField
          value={title}
          fullWidth
          margin="normal"
          name="title"
          sx={{ backgroundColor: "white" }}
          onChange={onChange}
          error={error.length !== 0}
          helperText={error}
          multiline
        />
        <TextField
          value={content}
          fullWidth
          margin="normal"
          name="content"
          sx={{ backgroundColor: "white" }}
          onChange={onChange}
          error={error.length !== 0}
          helperText={error}
          multiline
        />
        <Button
          type="submit"
          variant="outlined"
          sx={{ backgroundColor: "white", mt: 1 }}
        >
          Update
        </Button>
      </Stack>
    </Box>
  );
};

export default ContentUpdateEditor;
