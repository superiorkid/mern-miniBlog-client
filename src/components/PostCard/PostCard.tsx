import React, { FC, MouseEventHandler, useState } from "react";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Button,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ButtonGroup,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Tags from "../Tags/Tags";
import moment from "moment";
import { Link as RRDLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deletePostFn } from "../../api/FetchPost";

interface Props {
  post: IPost;
}

const PostCard: FC<Props> = ({ post }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const auth = localStorage.getItem("token");

  const { mutate: deletePost } = useMutation((id: string) => deletePostFn(id), {
    onError: (error, variables, context) => {
      toast({
        title: "Error delete post",
        status: "error",
        isClosable: true,
        duration: 5000,
        position: "bottom-right",
      });
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries("post");
      toast({
        title: "Delete post successfully",
        status: "success",
        isClosable: true,
        duration: 5000,
        position: "bottom-right",
      });
    },
  });

  const deletePostHandler = () => {
    deletePost(post.id);
  };

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
          {auth && (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<BsThreeDotsVertical />}
                variant="outline"
              />
              <MenuList>
                <MenuItem
                  icon={<EditIcon />}
                  as={RRDLink}
                  to={`/edit/${post.slug}`}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  icon={<DeleteIcon />}
                  onClick={() => {
                    onOpen();
                  }}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </CardHeader>

      {/* open modal */}
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this post?</Text>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup size="sm">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deletePostHandler}>
                Delete
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* modal close */}

      <CardBody>
        <LinkBox>
          <Flex direction="column" gap={2}>
            {post.thumbnail !== null ? (
              <Image
                objectFit="cover"
                src={`http://localhost:8000/post/cover/${post.thumbnail}`}
                alt="Chakra UI"
                w="full"
                h="200px"
              />
            ) : (
              <Image
                objectFit="cover"
                fallbackSrc="https://via.placeholder.com/500x200"
                alt="Chakra UI"
                w="full"
                h="200px"
              />
            )}

            <LinkOverlay as={RRDLink} to={`/detail/${post.slug}`}>
              <Text fontSize="2xl" ml="5px">
                {post.title}
              </Text>
            </LinkOverlay>
          </Flex>
          <HStack spacing={4}>
            {typeof post.tags !== "string"
              ? post.tags.map((tag, index) => <Tags key={index} tag={tag} />)
              : ""}
          </HStack>
        </LinkBox>
      </CardBody>
    </Card>
  );
};

export default PostCard;
