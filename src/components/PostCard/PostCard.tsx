import React, {FC, MouseEventHandler} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Avatar,
  Box,
  Heading,
  IconButton,
  Text,
  HStack,
  Image,
  VStack,
  LinkOverlay,
  LinkBox,
  Menu, MenuButton, MenuList, MenuItem, useToast, Button
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {FiShare2} from 'react-icons/fi'
import {DeleteIcon,EditIcon} from '@chakra-ui/icons'
import Tags from "../Tags/Tags";
import moment from "moment";
import {Link as RRDLink, useNavigate} from "react-router-dom";
import {LazyLoadImage} from 'react-lazy-load-image-component'
import {useMutation, useQueryClient} from "react-query";
import {deletePostFn} from "../../api/FetchPost";

interface Props {
  post: IPost;
}

const PostCard: FC<Props> = ({ post }) => {
  const toast = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const auth = localStorage.getItem('token')

  const {mutate: deletePost } = useMutation((id:string) => deletePostFn(id), {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries("post");
      toast({
        title: "Successfully deleted post",
        status: "success",
        isClosable: true,
        duration: 5000,
        position: "bottom-right"
      })
    }, onError: (error, variables, context) => {
      toast({
        title: "Error deleted post",
        status: "error",
        isClosable: true,
        duration: 5000,
        position: "bottom-right"
      })
    }
  })

  return (
    <Card>
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              name={post.author.username}
              src="https://bit.ly/sage-adebayo"
            />

            <Box>
              <Heading size="sm">{post.author.username}</Heading>
              <Text>{moment(post.createdAt.toString()).fromNow()}</Text>
            </Box>
          </Flex>
            <Menu isLazy>
              <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<BsThreeDotsVertical />}
              />
              <MenuList>
                <MenuItem icon={<FiShare2 />} >
                  Share
                </MenuItem>
                {auth && (
                  <>
                    <MenuItem as={RRDLink} icon={<EditIcon />} to={`/edit/${post.slug}`} >
                      Edit
                    </MenuItem>
                    <MenuItem as={Button} icon={<DeleteIcon />} onClick={() => deletePost(post.id)} >
                      Delete
                    </MenuItem>
                  </>
                )}

              </MenuList>
            </Menu>

        </Flex>
      </CardHeader>
      <CardBody>
        <LinkBox>
          <Flex direction="column" gap={2}>
            <Image as={LazyLoadImage}
              objectFit="cover"
              src={"http://localhost:8000/post/cover/" + post.thumbnail}
              alt="Chakra UI"
              w="full"
              h="200px"
            />
            <LinkOverlay as={RRDLink} to={`/detail/${post.slug}`}>
              <Text fontSize="2xl" ml="5px">
                {post.title}
              </Text>
            </LinkOverlay>
          </Flex>
          <HStack spacing={2}>
            {typeof post.tags !== "string" ? post.tags.map((tag: ITag, index: React.Key | null | undefined) => (
              <Tags key={index} tag={tag} />
            )) : ""}
          </HStack>
        </LinkBox>
      </CardBody>
    </Card>
  );
};

export default PostCard;
