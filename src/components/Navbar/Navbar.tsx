import React, {FC} from "react";
import {Box, Container, Flex, Heading, HStack, Spacer, Link, Button, useToast} from "@chakra-ui/react";
import {Link as RRDLink, useLocation, useNavigate} from 'react-router-dom'


const Navbar: FC = () => {
    const auth = localStorage.getItem("token")
    const navigate = useNavigate()
    const toast = useToast()
    
    const logoutHandler = () => {
        localStorage.removeItem("token")
        toast({
            title: "Logout successfully",
            status: "success",
            isClosable: true,
            duration: 5000,
            position: "bottom-right"
        })
        navigate("/")
    }

    return (
        <Box bg="teal.500" p="10px" color="white">
            <Container maxW="1000px">
                <Flex minWidth="max-content" alignItems="center">
                    <Box p="2">
                        <Heading size="md">Errors collection</Heading>
                    </Box>
                    <Spacer/>
                    <Box p="2">
                        <HStack>
                            <Button as={RRDLink} to="/" colorScheme="teal">
                                Article
                            </Button>
                            {auth ? (
                                <>
                                    <Button colorScheme="red" onClick={logoutHandler}>
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <Button as={RRDLink} to="/login" colorScheme="blue">
                                    Login
                                </Button>
                            )}
                        </HStack>

                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}

export default Navbar