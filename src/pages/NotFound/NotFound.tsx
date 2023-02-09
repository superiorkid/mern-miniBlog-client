import React, {FC} from 'react';
import {Box, Text, Link} from "@chakra-ui/react";
import {Link as RRDLink} from 'react-router-dom'

const NotFound: FC = () => {
    return (
        <>
            <Box color="red">
                <Text>404 | NOT FOUND</Text>
                <Box mt="20px">
                    <Link as={RRDLink} to="/">GO to homepage</Link>
                </Box>
            </Box>

        </>
    )
}

export default NotFound