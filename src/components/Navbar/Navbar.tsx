import React, {FC} from "react";
import {Box, Container, Flex, Heading, HStack, Spacer, Link, Button, useToast} from "@chakra-ui/react";
import {Link as RRDLink, useLocation, useNavigate} from 'react-router-dom'


const Navbar: FC = () => {
    return (
        <Box bg="teal.500" p="10px" color="white">
            <Container maxW="1000px">
                <Flex minWidth="max-content" alignItems="center">
                    <Box p="2">
                        <Heading size="md">Errors collection</Heading>
                    </Box>
                    <Spacer/>
                    <Box p="2">
                        <HStack gap="3">
                            <Heading size="sm">
                                <Link as={RRDLink} to="/">
                                    Home
                                </Link>
                            </Heading>
                            <Heading size="sm">
                                <Link as={RRDLink} to="/profile">
                                    About
                                </Link>
                            </Heading>
                        </HStack>

                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}
