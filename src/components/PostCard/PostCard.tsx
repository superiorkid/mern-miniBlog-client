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
import Tags from "../Tags/Tags";
import moment from "moment";
import {Link as RRDLink} from 'react-router-dom'

interface Props {
    post: IPost
}


const PostCard: FC<Props> = ({post}) => {

    return (
        <Card>
            <CardHeader>
                <Flex>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={post.author.username} src='https://bit.ly/sage-adebayo' />

                        <Box>
                            <Heading size='sm'>{post.author.username}</Heading>
                            <Text>{moment(post.createdAt.toString()).fromNow()}</Text>
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
                <LinkBox>
                    <Flex direction="column" gap={2}>
                        <Image
                            objectFit='cover'
                            src={"http://localhost:8000/post/cover/" + post.thumbnail}
                            alt='Chakra UI'
                            w="full"
                            h="200px"
                        />
                        <LinkOverlay as={RRDLink} to={`/detail/${post.slug}`}>
                            <Text fontSize="2xl" ml="5px">{post.title}</Text>
                        </LinkOverlay>
                    </Flex>
                    <HStack spacing={4}>
                        <Tags/>
                    </HStack>
                </LinkBox>
            </CardBody>
        </Card>
    )
}

export default PostCard