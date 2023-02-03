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
    Image, VStack, LinkOverlay, LinkBox
} from "@chakra-ui/react";
import {BsThreeDotsVertical} from 'react-icons/bs'
import {CiHashtag} from 'react-icons/ci'
import Tags from "../Tags/Tags";
import moment from "moment";

interface Props {
    post: IPost
}


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
                        src={"http://localhost:8000/post/cover/" + post.thumbnail}
                        alt='Chakra UI'
                        w="full"
                        h="200px"
                    />
                    <Text fontSize="2xl" ml="5px">{post.title}</Text>
                </Flex>
                <HStack spacing={4}>
                    <Tags/>
                </HStack>
            </CardBody>
        </Card>
    )
}

export default PostCard