import {
  Button,
  Card,
  Select,
  Stack,
  TextField,
  Typography, FormControl, InputLabel, MenuItem
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../api/posts";
import { getCommunities } from "../../api/communities";
import ErrorAlert from "../ErrorAlert";
import { isLoggedIn } from "../../helpers/authHelper";
import HorizontalStack from "../util/HorizontalStack";
import UserAvatar from "../UserAvatar";

const PostEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  
  const [community, setCommunity] = useState("");
  const [communities, setCommunities] = useState([]);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const user = isLoggedIn();

  useEffect(() => {
    getCommunities().then((data) => {
      setCommunities(data.communities);
    });
  }, [community, setCommunity]);

  const onChange = (e) => {
    setCommunity(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const errors = validate();
    setErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const data = await createPost({
      title: formData.title,
      content: formData.content,
      communityId: community, 
    }, isLoggedIn());

    setLoading(false);
    if (data && data.error) {
      setServerError(data.error);
    } else {
      navigate("/posts/" + data._id);
    }
  };

  const validate = () => {
    const errors = {};

    return errors;
  };

  return (
    <Card>
      <Stack spacing={1}>
        {user && (
          <HorizontalStack spacing={2}>
            <UserAvatar width={50} height={50} username={user.username} />
            <Typography variant="h5">
              What would you like to post today {user.username}?
            </Typography>
          </HorizontalStack>
        )}

        <Typography>
          <a href="https://commonmark.org/help/" target="_blank">
            Markdown Help
          </a>
        </Typography>

      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
      <InputLabel id= "communityId">Choose a community</InputLabel>
      <Select
        labelId="communityId"
        id="community"
        value={community}
        onChange={onChange}
        label="Choose a community"
        sx={{ border: 2, borderColor: 'grey.300' }}
      >
        <MenuItem value="">
            <em>None</em>
          </MenuItem>
        {communities.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            required
            name="title"
            margin="normal"
            onChange={handleChange}
            error={errors.title !== undefined}
            helperText={errors.title}
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={10}
            name="content"
            margin="normal"
            onChange={handleChange}
            error={errors.content !== undefined}
            helperText={errors.content}
            required
          />
          <ErrorAlert error={serverError} />
          <Button
            variant="outlined"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
            }}
          >
            {loading ? <>Submitting</> : <>Submit</>}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default PostEditor;
