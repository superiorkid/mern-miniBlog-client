import { Tag, TagLabel, TagLeftIcon, Badge } from "@chakra-ui/react";
import { CiHashtag } from "react-icons/ci";
import React, { FC } from "react";
import { Link as RRDLink } from "react-router-dom";

type Props = {
  tag: ITag;
};

const Tags: FC<Props> = ({ tag }) => {
  return (
    <>
      <Tag
        size="sm"
        variant="subtle"
        colorScheme="cyan"
        as={RRDLink}
        to={`/tag/${tag.name}`}
        mx="2px"
      >
        <TagLeftIcon boxSize="12px" as={CiHashtag} />
        <TagLabel>
          {tag.name} <Badge colorScheme="red">{tag.posts?.length}</Badge>
        </TagLabel>
      </Tag>
    </>
  );
};

export default Tags;
