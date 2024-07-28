import {
  Flex,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography
} from '@mui/material';
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteCommunity } from "../../api/communities";

export const DeleteCommunityModal = ({ communityId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = await deleteCommunity(communityId);
    if (!data.error) {
      toast.success("Community deleted successfully!");
      navigate("/explore");
      onClose();
    } else {
      toast.error("Community failed to delete!");
    }
  };

  return (
    <>
      <Flex as={"button"} onClick={onOpen}>
        <Icon as={AiOutlineDelete} mr={2} />
        <Text fontSize="9pt">Delete</Text>
      </Flex>
      {/*<Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Delete Community</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={"10pt"} fontWeight={"semibold"} mb={2}>
              Are you sure you want to delete this community?
            </Text>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button onClick={onClose} variant={"outline"}>
              Close
            </Button>
            <Button onClick={onSubmit}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>*/}
       <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Delete Community</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
          Are you sure you want to delete this community?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ gap: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button onClick={onSubmit} variant="contained" color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};
