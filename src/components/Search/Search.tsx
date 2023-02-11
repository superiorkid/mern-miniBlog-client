import React, { ChangeEvent, FC, useState } from "react";
import { Input } from "@chakra-ui/react";

type Props = {
  onHandleSearch: (value: string) => void;
};

const Search: FC<Props> = ({ onHandleSearch }) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onHandleSearch(event.target.value);
  };

  return (
    <>
      <Input
        w="300px"
        type="search"
        placeholder="Search...."
        bg="gray.200"
        color="black"
        size="md"
        onChange={handleSearch}
      />
    </>
  );
};

export default Search;
