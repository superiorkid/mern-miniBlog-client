import {
  Box,
  Heading,
  TagLeftIcon,
  TagLabel,
  Tag,
  filter,
} from "@chakra-ui/react";
import { FC } from "react";
import { useQuery } from "react-query";
import { fetchTagsFn } from "../../api/FetchTags";
import { CiHashtag } from "react-icons/ci";
import { Link as RRDLink } from "react-router-dom";
import Tags from "../Tags/Tags";

const Sidebar: FC = () => {
  const { data: tags } = useQuery<ITag[], Error>(["tags"], fetchTagsFn);

  //   tags with posts available
  const filteredTags = tags?.filter((predicate) => predicate.posts.length > 0);

  return (
    <Box as="aside" p="10px" w="200px">
      <Heading
        size="md"
        p="5px"
        borderBottom="1px"
        borderBottomColor="gray.200"
        my="5px"
      >
        Explore tags
      </Heading>
      <Box display="flex" flexDirection="column" gap="2">
        {filteredTags?.map((tag, index) => (
          <Tags key={index} tag={tag} />
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
