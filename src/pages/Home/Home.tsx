import React, {FC} from "react";
import Layout from "../../components/Layout/Layout";
import {Link as RRDLink} from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import {Box, Button, Flex, Heading, Spacer} from "@chakra-ui/react";


const Home: FC = () => {
    return (
        <Layout>
            <Box borderBottom='1px' borderColor='gray.200' p="2" mb="3px">
                <Flex alignItems="center">
                    <Heading ml="3px" size="lg">Latest</Heading>
                    <Spacer/>
                    <Button as={RRDLink} to="/write-article" colorScheme="teal">
                        Write new acticle
                    </Button>
                </Flex>
            </Box>
            <Flex direction="column" gap={3} p={2}>
                <PostCard/>
            </Flex>
        </Layout>
    )
}

export default Home