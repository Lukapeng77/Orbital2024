import React, { useState } from "react";
import {
  Flex,
  Icon,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import toast from "react-hot-toast";
import { updateCommunity } from "../../api/communities";

export const EditCommunityModel = ({ community }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: community?.name || "",
    bio: community?.bio || "",
  });

  const onChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = await updateCommunity(community?._id, form);
    if (!data.error) {
      toast.success("Community updated successfully!");
      navigate(0);
      onClose();
    } else {
      toast.error("Community failed to update!");
    }
  };

  return (
    <>
      <Flex as={"button"} onClick={onOpen}>
        <Icon as={AiOutlineEdit} mr={2} />
        <Text fontSize="9pt">Edit</Text>
      </Flex>
      <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Community</DialogTitle>
      <DialogContent>
        <form style={{ width: '100%' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Name</Typography>
            <TextField
              fullWidth
              name="name"
              placeholder="Name"
              defaultValue={community?.name}
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
              defaultValue={community?.bio}
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
          Edit Community
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};
