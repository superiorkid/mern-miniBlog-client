import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { FC } from "react";

const Loaders: FC = () => {
  return (
    <Box position="relative" mt="120px">
      <Center>
        <CircularProgress
          size="100px"
          isIndeterminate
          color="green.300"
        ></CircularProgress>
        <CircularProgressLabel fontSize="13px">Loading..</CircularProgressLabel>
      </Center>
    </Box>
  );
};

export default Loaders;
