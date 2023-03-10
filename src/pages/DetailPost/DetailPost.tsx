import React, { FC } from "react";
import Layout from "../../components/Layout/Layout";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchSinglePost } from "../../api/FetchPost";
import moment from "moment/moment";

const DetailPost: FC = () => {
  const { slug } = useParams();
  const { data, isError, isLoading, error } = useQuery<IPost, Error>(
    ["post", slug],
    () => fetchSinglePost(slug)
  );

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>{error.message}</Box>;
  }

  return (
    <Layout>
      <Box w="full">
        {data?.thumbnail !== null ? (
          <Image
            objectFit="cover"
            src={"http://localhost:8000/post/cover/" + data?.thumbnail}
            alt="Cover"
            w="full"
            h="300px"
          />
        ) : (
          <Image
            objectFit="cover"
            fallbackSrc="https://via.placeholder.com/800x400"
            alt="Cover"
            w="full"
            h="300px"
          />
        )}
      </Box>
      <Flex mt="20px">
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar
            name={data?.author.username}
            src="https://bit.ly/sage-adebayo"
          />

          <Box>
            <Heading size="sm">{data?.author.username}</Heading>
            <Text>{moment(data?.createdAt.toString()).fromNow()}</Text>
          </Box>
        </Flex>
      </Flex>

      <Box mt="25px">
        <Heading size="lg">{data?.title}</Heading>
      </Box>

      <Divider my="10px" />

      <Box mt="10px">
        <Text
          as="article"
          fontSize="16.5px"
          dangerouslySetInnerHTML={{ __html: data?.body }}
        ></Text>
      </Box>
    </Layout>
  );
};

export default DetailPost;
