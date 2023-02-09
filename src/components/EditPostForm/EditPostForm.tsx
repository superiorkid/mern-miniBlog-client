import React, {FC, useEffect} from 'react';
import {
    Box,
    Button,
    FormControl, FormErrorMessage, Image,
    Input, Stack, useToast,
    VStack
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import {useFilePicker} from "use-file-picker";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup'
import {useMutation, useQueryClient} from 'react-query'
import {updatePostFn} from "../../api/FetchPost";
import {useNavigate} from "react-router-dom";


const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'code'],
        ['clean'],
    ],
};


const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'code',
];



type Props = {
    post: IPost
}

type TNewPost = {
    title: string,
    body: string,
    thumbnail: string,
    tags: string
}

const schema = yup.object({
    title: yup.string().required(),
    body: yup.string().required(),
    tags: yup.string().required()
}).required()

type FormData = yup.InferType<typeof schema>

const EditPostForm: FC<Props> = ({post}) => {
    const queryClient = useQueryClient()
    const toast = useToast()
    const navigate = useNavigate()
    const {handleSubmit, register, formState: {errors, isSubmitting}, setValue, watch} = useForm<FormData>({resolver: yupResolver(schema)})
    const [openFileSelector, {filesContent, loading, plainFiles, clear}] = useFilePicker({
        readAs: "DataURL",
        accept: ["image/png", "image/jpg", "image/jpeg"],
        multiple: false,
        limitFilesConfig: {max: 2},
        maxFileSize: 50, // in megabytes
    })


    useEffect(() => {
        register("body")
    }, [register])

    const {mutate: updatePost} = useMutation(({id, newPost}: {id: string, newPost: IPost}) => updatePostFn({id, newPost}), {
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries("post")
            toast({
                title: "Successfully updated post",
                status: "success",
                isClosable: true,
                duration: 5000,
                position: "bottom-right"
            })
            navigate('/')
        }, onError: (error, variables, context) => {
            toast({
                title: "error updated post",
                status: "error",
                isClosable: true,
                duration: 5000,
                position: "bottom-right"
            })
        }
    })

    const onBodyStateChange = (editorState: string) => {
        setValue("body", editorState)
    }

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data)
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("body", data.body)
        formData.append("tags", data.tags)
        formData.append("thumbnail", filesContent[0]?.content)
        // @ts-ignore
        updatePost({id: post?.id!, newPost: formData})
    }

    const generateTag = (tags: ITag[]) => {
        let temp = ""
        for (const tag of tags) {
            temp += tag.name + ", "
        }

        return temp.slice(0, temp.length - 2)
    }


    return (
        <>
           <Box mt="10px">
               <form onSubmit={handleSubmit(onSubmit)}>
                   <VStack spacing="11px">
                       <FormControl>
                           <Stack direction="row">
                               <Button border="2px" borderColor='green.500' onClick={() => openFileSelector()} isLoading={loading}>{!!plainFiles.length ? "Change" : "Add a cover image"}</Button>
                               {!!plainFiles.length && (
                                   <>
                                       <Button border="2px" borderColor='red.500' onClick={() => clear()} isLoading={loading}>Clear</Button>
                                       <Image boxSize='150px' objectFit='cover' src={!!filesContent.length ? filesContent[0].content : `http://localhost:8000/post/cover/${post.thumbnail}`} alt={filesContent[0].name} />
                                   </>
                               )}
                           </Stack>
                       </FormControl>
                       <FormControl isInvalid={Boolean(errors.title)}>
                            <Input type="text" defaultValue={post.title} {...register("title")} />
                            <FormErrorMessage>
                                {errors.title && errors.title.message}
                            </FormErrorMessage>
                       </FormControl>
                       <FormControl isInvalid={Boolean(errors.body)}>
                           <ReactQuill theme="snow" defaultValue={post.body} onChange={onBodyStateChange} placeholder="write your post here..." modules={modules} formats={formats} />
                           <FormErrorMessage>
                               {errors.body && errors.body.message}
                           </FormErrorMessage>
                       </FormControl>
                       <FormControl isInvalid={Boolean(errors.tags)}>
                           <Input type="text" {...register("tags")} defaultValue={typeof post.tags !== "string" ? generateTag(post.tags) : ""} />
                           <FormErrorMessage>
                               {errors.tags && errors.tags.message}
                           </FormErrorMessage>
                       </FormControl>
                   </VStack>
                   <Button type="submit" colorScheme="purple" mt={5} size="sm" isLoading={isSubmitting}>
                       Edit
                   </Button>
               </form>
           </Box>
        </>
    );
};

export default EditPostForm;