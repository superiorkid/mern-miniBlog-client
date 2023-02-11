import React, { FC, useState } from "react";
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
  Text,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchPosts } from "../../api/FetchPost";
import Search from "../../components/Search/Search";

const Home: FC = () => {
  const { data, isLoading, isError, error } = useQuery<IPost[], Error>(
    ["post"],
    fetchPosts
  );
  const auth = localStorage.getItem("token");
  const [search, setSearch] = useState<string>("");

  if (isLoading) {
    return <Box>loading...</Box>;
  }

  if (isError) {
    return <Box>{error.message}</Box>;
  }

  const onHandleSearch = (value: string) => {
    setSearch(value);
  };

  const filteredPost = data?.filter((predicate, index) => {
    return predicate.title.toLowerCase().includes(search);
  });

  return (
    <Layout>
      <Box
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        mb="3px"
        display="flex"
      >
        <Heading ml="3px" size="lg">
          Latest
        </Heading>
        <Spacer />
        <Search onHandleSearch={onHandleSearch} />
      </Box>

      {data!.length < 1 ? (
        <Box w="full" mt="7px" px="5px">
          <Alert status="error">
            <AlertIcon />
            Post is empty
          </Alert>
        </Box>
      ) : search ? (
        <Flex direction="column" gap={3} p={2}>
          {filteredPost?.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Flex>
      ) : (
        <Flex direction="column" gap={3} p={2}>
          {data?.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Flex>
      )}

      {/* 
      {data!.length < 1 ? (
        <Box w="full" mt="7px" px="5px">
          <Alert status="error">
            <AlertIcon />
            Post is empty
          </Alert>
        </Box>
      ) : search ? (
        <Text>Searching...</Text>
      ) : (
        <Flex direction="column" gap={3} p={2}>
          {data?.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Flex>
      )} */}
    </Layout>
  );
};

export default Home;
