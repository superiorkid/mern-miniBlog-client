import React, { FC, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  useToast,
  VStack,
  InputLeftAddon,
  Stack,
  Image,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import { createPostFn } from "../../api/FetchPost";
import { useMutation, useQueryClient } from "react-query";

const schema = yup
  .object({
    title: yup.string().required(),
    body: yup.string().required(),
    tags: yup.string().required(),
    thumbnail: yup.mixed().notRequired(),
  })
  .required();

type FormDataSchema = yup.InferType<typeof schema>;

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "code"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "code",
];

const CreateNewFormPost: FC = () => {
  const queryClient = useQueryClient();
  const [openFileSelector, { filesContent, loading, plainFiles, clear }] =
    useFilePicker({
      readAs: "DataURL",
      accept: ["image/jpeg", "image/jpg", "image/png"],
      multiple: false,
      limitFilesConfig: { max: 2 },
      maxFileSize: 50, // in megabytes
    });
  const navigate = useNavigate();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<FormDataSchema>({
    resolver: yupResolver(schema),
  });

  const { mutate: createPost } = useMutation(
    (newPost: IPost) => createPostFn(newPost),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries("post");
        toast({
          title: "Create new post successfully",
          status: "success",
          isClosable: true,
          duration: 5000,
          position: "bottom-right",
        });
        navigate("/");
      },
      onError: (error, variables, context) => {
        toast({
          title: "Error create new post",
          status: "error",
          isClosable: true,
          duration: 5000,
          position: "bottom-right",
        });
      },
    }
  );

  useEffect(() => {
    register("body", { required: true });
  }, [register]);

  const onBodyStateChange = (editorState: any) => {
    setValue("body", editorState);
  };

  const bodyContent = watch("body");

  const onSubmitHandler: SubmitHandler<FormDataSchema> = async (newPost) => {
    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("body", newPost.body);
    formData.append("thumbnail", filesContent[0].content);
    formData.append("tags", newPost.tags);
    // @ts-ignore
    createPost(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <VStack spacing="11px">
        <FormControl>
          <Stack direction="row">
            <Button
              border="2px"
              borderColor="green.500"
              onClick={() => openFileSelector()}
              isLoading={loading}
            >
              {!!plainFiles.length ? "Change" : "Add a cover image"}
            </Button>
            {!!plainFiles.length && (
              <>
                <Button
                  border="2px"
                  borderColor="red.500"
                  onClick={() => clear()}
                  isLoading={loading}
                >
                  Clear
                </Button>
                <Image
                  boxSize="150px"
                  objectFit="cover"
                  src={filesContent[0].content}
                  alt={filesContent[0].name}
                />
              </>
            )}
          </Stack>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.title)}>
          <Input
            type="text"
            {...register("title")}
            placeholder="New post title here..."
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.tags)}>
          <InputGroup>
            <InputLeftAddon children="tags" />
            <Input
              type="text"
              {...register("tags")}
              placeholder="example: react, mongodb"
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.tags && errors.tags.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.body)}>
          <ReactQuill
            theme="snow"
            value={bodyContent}
            onChange={onBodyStateChange}
            placeholder="write your post here..."
            modules={modules}
            formats={formats}
          />
          <FormErrorMessage>
            {errors.body && errors.body.message}
          </FormErrorMessage>
        </FormControl>
      </VStack>
      <Button
        type="submit"
        isLoading={isSubmitting}
        colorScheme="purple"
        mt={5}
        size="sm"
      >
        Publish
      </Button>
    </form>
  );
};

export default CreateNewFormPost;
