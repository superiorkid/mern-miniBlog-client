import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { CiHashtag } from "react-icons/ci";
import React, { FC } from "react";

type Props = {
  tag: ITag;
};

const Tags: FC<Props> = ({ tag }) => {
  return (
    <>
      <Tag size="sm" key="sm" variant="subtle" colorScheme="cyan">
        <TagLeftIcon boxSize="12px" as={CiHashtag} />
        <TagLabel>{tag.name}</TagLabel>
      </Tag>
    </>
  );
};

export default Tags;
