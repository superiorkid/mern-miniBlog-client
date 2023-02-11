import React, { FC, ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import { Box, Container, Flex, Grid } from "@chakra-ui/react";
import Sidebar from "../Sidebar/Sidebar";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxW="950px" display="flex" gap={3}>
        <Sidebar />
        <Box w="700px" my="13px">
          {children}
        </Box>
      </Container>
    </>
  );
};

export default Layout;
