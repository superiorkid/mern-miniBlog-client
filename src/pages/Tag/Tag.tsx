import { FC } from "react";
import Layout from "../../components/Layout/Layout";
import { Box, Heading, Spacer, Alert, AlertIcon } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchTagsFn } from "../../api/FetchTags";
import Tags from "../../components/Tags/Tags";
import PostCard from "../../components/PostCard/PostCard";

const Tag: FC = () => {
  const { tag } = useParams();
  const { data: tags } = useQuery<ITag[], Error>(["tags"], fetchTagsFn);

  const filtered = tags
    ?.filter((predicate) => predicate.name === tag)
    .map((post) => post.posts)[0]; // [ [ {} ] ]

  console.log(filtered);

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
          # Programming
        </Heading>
      </Box>
      {filtered!.length > 0 ? (
        filtered?.map((post) => <PostCard key={post.slug} post={post} />)
      ) : (
        <Box w="full" mt="7px" px="5px">
          <Alert status="error">
            <AlertIcon />
            post on this category is empty
          </Alert>
        </Box>
      )}
    </Layout>
  );
};

export default Tag;
