import React, { FC } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Spacer,
  Link,
  Button,
  useToast,
  Input,
} from "@chakra-ui/react";
import { Link as RRDLink, useLocation, useNavigate } from "react-router-dom";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box as="nav" bg="teal.500" p="10px" color="white">
      <Container maxW="1000px">
        <Flex minWidth="max-content" alignItems="center" gap={2}>
          <Box p="2">
            <Heading size="md">M E R N -miniBLOG</Heading>
          </Box>

          {auth && (
            <Box p="2">
              <Button as={RRDLink} to="/write-article" colorScheme="yellow">
                Write new acticle
              </Button>
            </Box>
          )}
          <Spacer />
          <Box p="2">
            <HStack gap="3">
              <Heading size="sm">
                <Link as={RRDLink} to="/">
                  Home
                </Link>
              </Heading>
              <Heading size="sm">
                {auth ? (
                  <Button
                    colorScheme="red"
                    variant="solid"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    as={RRDLink}
                    to="/login"
                    colorScheme="blue"
                    variant="solid"
                  >
                    Login
                  </Button>
                )}
              </Heading>
            </HStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
