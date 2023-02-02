import React, {FC} from "react";
import Layout from "../../components/Layout/Layout";
import {Link} from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import {Box, Button, Flex, Heading, Spacer} from "@chakra-ui/react";


const Home: FC = () => {
    const {data, isLoading, isError, error} = useQuery<IPost[], Error>("post", fetchPosts)

    if (isLoading) {
        return (
            <Box>
                loading...
            </Box>
        )
    }

    if (isError) {
        return <Box>{error.message}</Box>
    }

    return (
        <Layout>
            <Flex direction="column" gap={3} p={2}>
                <PostCard/>
            </Flex>
        </Layout>
    )
}

export default Home