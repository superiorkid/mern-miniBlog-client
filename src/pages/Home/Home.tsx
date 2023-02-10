import React, { FC } from "react";
import Layout from "../../components/Layout/Layout";
import { Link as RRDLink } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchPosts } from "../../api/FetchPost";

const Home: FC = () => {
  const { data, isLoading, isError, error } = useQuery<IPost[], Error>(
    ["post"],
    fetchPosts
  );
  const auth = localStorage.getItem("token");

  if (isLoading) {
    return <Box>loading...</Box>;
  }

  if (isError) {
    return <Box>{error.message}</Box>;
  }

  return (
    <Layout>
      <Box borderBottom="1px" borderColor="gray.200" p="2" mb="3px">
        <Heading ml="3px" size="lg">
          Latest
        </Heading>
      </Box>
      {data!.length < 1 ? (
        <Box w="full" mt="7px" px="5px">
          <Alert status="error">
            <AlertIcon />
            Post is empty
          </Alert>
        </Box>
      ) : (
        <Flex direction="column" gap={3} p={2}>
          {data?.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Flex>
      )}
    </Layout>
  );
};

export default Home;
