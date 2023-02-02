import React, {FC} from "react";
import Layout from "../../components/Layout/Layout";
import {Link} from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import {Flex, Heading} from "@chakra-ui/react";


const Home: FC = () => {
    return (
        <Layout>
            <Flex direction="column" gap={3} p={2}>
                <PostCard/>
                <PostCard/>
            </Flex>
        </Layout>
    )
}

export default Home