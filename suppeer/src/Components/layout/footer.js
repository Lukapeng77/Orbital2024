import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
  function getCurrentYear() {
    return new Date().getFullYear();
  }

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      marginTop="auto"
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={3}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "center" }}
        align={{ base: "center", md: "center" }}
        fontSize={"10pt"}
      >
        <Text>Copyright © {getCurrentYear()} SUP Peer </Text>
      </Container>
    </Box>
  );
}
