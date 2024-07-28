import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const CreatePostBtn = ({ handleSort }) => {
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("Sort By")

  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="white"
      height="56px"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.300"
      p={2}
      mb={4}
    >
      <Input
        placeholder="Create Post"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4}
        mr={4}
        onClick={() => navigate("/posts/create")}
      />
      <Menu
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
      >
        {({ isOpen }) => (
          <>
            <MenuButton
              fontSize="10pt"
              border="1px solid"
              borderRadius={4}
              bg="gray.50"
              borderColor="gray.200"
              height="36px"
              _hover={{
                bg: "white",
                border: "1px solid",
                borderColor: "blue.500",
              }}
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              minW={36}
            >
              {sortBy}
            </MenuButton>
            <MenuList>
              <MenuItem fontSize="10pt" onClick={() => {setSortBy("Latest"); handleSort("createdAt")}}>
                Latest
              </MenuItem>
              <MenuItem
                fontSize="10pt"
                as={"button"}
                onClick={() => {setSortBy("Likes"); handleSort("likeCount")}}
              >
                Likes
              </MenuItem>
              <MenuItem
                fontSize="10pt"
                as={"button"}
                onClick={() =>{setSortBy("Comments"); handleSort("commentCount")}}
              >
                Comments
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  );
};
