import React, {FC, ReactNode} from "react";
import Navbar from "../Navbar/Navbar";
import {Box, Container} from "@chakra-ui/react";

type Props = {
    children: ReactNode
}

const Layout: FC<Props> = ({children}) => {
    return (
        <>
            <Navbar/>
            <Container maxW='700px'>
                <Box my="13px">
                    {children}
                </Box>
            </Container>
        </>
    )
}

export default Layout