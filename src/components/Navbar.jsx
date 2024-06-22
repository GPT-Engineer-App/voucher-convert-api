import { Link } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="teal.500" p={4}>
      <Flex justify="space-between" align="center">
        <Box>
          <Button as={Link} to="/" colorScheme="teal" variant="ghost">Home</Button>
          <Button as={Link} to="/signin" colorScheme="teal" variant="ghost">Sign In</Button>
          <Button as={Link} to="/signup" colorScheme="teal" variant="ghost">Sign Up</Button>
          <Button as={Link} to="/admin" colorScheme="teal" variant="ghost">Admin Dashboard</Button>
          <Button as={Link} to="/customer-support" colorScheme="teal" variant="ghost">Customer Support</Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;