import React, {FC} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Avatar,
    Box,
    Heading,
    IconButton,
    Text,
    HStack,
    Image, VStack
} from "@chakra-ui/react";
import {BsThreeDotsVertical} from 'react-icons/bs'
import {CiHashtag} from 'react-icons/ci'
import Tags from "../Tags/Tags";


const PostCard: FC = () => {
    return (
        <Card>
            <CardHeader>
                <Flex>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                        <Box>
                            <Heading size='sm'>Superiorkid</Heading>
                            <Text>30 jan</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<BsThreeDotsVertical />}
                    />
                </Flex>
            </CardHeader>
            <CardBody>
                <Flex direction="column" gap={2}>
                    <Image
                        objectFit='cover'
                        src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt='Chakra UI'
                    />
                    <Text fontSize="2xl" ml="5px">How to use React JS + CHakra Ui</Text>
                </Flex>
                <HStack spacing={4}>
                    <Tags/>
                </HStack>
            </CardBody>
        </Card>
    )
}

export default PostCard