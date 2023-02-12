import React, { FC } from "react";
import Layout from "../../components/Layout/Layout";
import { Box, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import EditPostForm from "../../components/EditPostForm/EditPostForm";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchSinglePost } from "../../api/FetchPost";
import Loaders from "../../components/Loaders/Loaders";

const EditPost: FC = () => {
  const { slug } = useParams();
  const {
    isLoading,
    isError,
    data: post,
    error,
  } = useQuery<IPost, Error>(["post", slug], () => fetchSinglePost(slug));

  if (isLoading) {
    return <Loaders />;
  }

  if (isError) {
    return <Box>{error.message}</Box>;
  }

  return (
    <Layout>
      <Card>
        <CardHeader>
          <Heading size="md">Edit post</Heading>
        </CardHeader>
        <CardBody>
          <EditPostForm post={post!} />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default EditPost;
