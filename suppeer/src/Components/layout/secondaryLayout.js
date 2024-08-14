import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const SecondaryLayout = ({ children, maxWidth }) => {
  return (
    <Flex justify="center" p="16px 0px" flexDirection="column" alignItems="center">
      <Flex
        width="100%"
        maxWidth={maxWidth || "860px"}
        justify="center"
        alignItems="flex-start"
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: "24px", md: "40px" }}
        p={{ base: "0 16px", md: "0 32px" }}
      >
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 1, md: 6 }}
        >
          {children && children[0]}
        </Flex>

        {/* Right Content */}
        <Box
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          flexGrow={1}
        >
          {children && children[1]}
        </Box>
      </Flex>
    </Flex>
  );
};

export default SecondaryLayout;
