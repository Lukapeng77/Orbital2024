import {
  Flex,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";
import { createCommunity, getCommunities } from "../../api/communities";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { isLoggedIn } from "../../helpers/authHelper";

export const SidePostCommunity = () => {
  const [communities, setCommunities] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const user = isLoggedIn();

  const [form, setForm] = useState({
    name: "",
    bio: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    const data = await createCommunity(form);
    if (!data.error) {
      toast.success("Community created successfully!");
      onClose();
    }
  };

  const onChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getCommunities().then((data) => {
      setCommunities(data.communities);
    });
  }, []);

  return (
    <>
      <Flex
        direction="column"
        bg="white"
        borderRadius={4}
        cursor="pointer"
        border="1px solid"
        borderColor="gray.300"
      >
        <Flex
          align="flex-end"
          color="white"
          p="6px 10px"
          bg="blue.500"
          height="70px"
          borderRadius="4px 4px 0px 0px"
          fontWeight={600}
          cursor={"pointer"}
          bgImage="url(/images/recCommsArt.png)"
          backgroundSize="cover"
          bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
          url('images/recCommsArt.png')"
        >
          Create Page
        </Flex>
        <Flex direction="column">
          <Stack mt={2} p={3}>
        <Button variant="contained" color="primary" fullWidth sx={{
          mb: 1,
          borderRadius: 28,
          bgcolor: 'blue.600',
          '&:hover': {
            bgcolor: 'blue.700',
          },
        }} component="a" href="/posts/create" size="small">
          Create Post
        </Button>
        <Button variant="contained" color="primary" fullWidth sx={{
          borderRadius: 28,
          bgcolor: 'blue.600',
          '&:hover': {
            bgcolor: 'blue.700',
          },
        }} size="small" onClick={() => {
          if (user) {
            onOpen();
          } else {
            navigate('/login');
          }
        }}>
          Create Community
        </Button>
          </Stack>
        </Flex>
      </Flex>

    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create a Community</DialogTitle>
      <DialogContent>
        <form style={{ width: '100%' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Name</Typography>
            <TextField
              fullWidth
              name="name"
              placeholder="Name"
              //defaultValue={community?.name}
              onChange={onChange}
              margin="dense"
              variant="outlined"
            />
          </Box>
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Description</Typography>
            <TextField
              fullWidth
              multiline
              name="bio"
              rows={4}
              placeholder="About Community"
              //defaultValue={community?.bio}
              onChange={onChange}
              margin="dense"
              variant="outlined"
              InputProps={{
                sx: {
                  '&:hover': {
                    borderColor: 'blue.500',
                  },
                  '&.Mui-focused': {
                    borderColor: 'blue.500',
                  },
                }
              }}
            />
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button onClick={onSubmit} variant="contained">
          Create Community
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};
