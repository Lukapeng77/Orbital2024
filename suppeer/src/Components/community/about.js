import React from "react";
import {
  Box,
  Divider,
  Flex,
  Icon,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { RiCakeLine } from "react-icons/ri";
import { isLoggedIn } from "../../helpers/authHelper";
import moment from "moment";

const About = ({ community }) => {
  const user = isLoggedIn();

  return (
    <Box position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        p={3}
        color="white"
        bg="blue.400"
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="10pt" fontWeight={700}>
          About Community
        </Text>
        
      </Flex>
      <Flex
        direction="column"
        p={3}
        bg="white"
        border={2}
        borderStyle={"solid"}
        borderColor={"gray.100"}
        borderRadius="0px 0px 4px 4px"
      >
        {!community ? (
          <Stack mt={2}>
            <SkeletonCircle size="10" />
            <Skeleton height="10px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <>
            {community?.bio && (
              <Box
                bg="gray.100"
                width="240px"
                p={2}
                borderRadius={4}
                border="1px solid"
                borderColor="gray.300"
                cursor="pointer"
              >
                <Text fontSize="9pt" fontWeight={700} color="blue.500">
                  {community.bio}
                </Text>
              </Box>
            )}
            <Stack spacing={2}>
              <Flex
                fontSize="10pt"
                direction="row"
                justify={"space-between"}
                flexGrow={1}
                p={2}
              >
                <Text>Members</Text>
                <Text>{community?.subscribedBy?.length}</Text>
              </Flex>
              <Divider />
              <Flex
                align="center"
                width="100%"
                p={1}
                fontWeight={500}
                fontSize="10pt"
              >
                <Icon as={RiCakeLine} mr={2} fontSize={18} />
                {community?.createdAt && (
                  <Text>
                    Created{" "}
                    {moment(new Date(community?.createdAt)).format(
                      "MMM DD, YYYY"
                    )}
                  </Text>
                )}
              </Flex>
              {user && (
                <Link to="/posts/create">
                <Button variant="contained" sx={{ mt: 3, width: '100%', height: 30 }}>
                  Create Post
                </Button>
              </Link>
              )}
            </Stack>
          </>
        )}
      </Flex>
    </Box>
  );
};
export default About;
