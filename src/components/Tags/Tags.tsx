import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { CiHashtag } from "react-icons/ci";
import React, { FC } from "react";

const Tags: FC = () => {
  return (
    <>
      <Tag size="sm" key="sm" variant="subtle" colorScheme="cyan">
        <TagLeftIcon boxSize="12px" as={CiHashtag} />
        <TagLabel>JavaScript</TagLabel>
      </Tag>
    </>
  );
};

export default Tags;
