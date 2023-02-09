import React, {FC, useEffect} from "react";
import {Button, FormControl, FormErrorMessage, Input, useToast, VStack} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'


const schema = yup.object({
    title: yup.string().required(),
    body: yup.string().required(),
    thumbnail: yup.mixed().required("File is required.")
}).required()


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

const CreateNewFormPost: FC = () => {
    const toast = useToast()
    const {handleSubmit, register, formState: {errors, isSubmitting}, reset, watch, setValue} = useForm<IPost>({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        register("body", {required: true})
    }, [register])

    const onBodyStateChange = (editorState: any) => {
        setValue("body", editorState)
    }

    const onSubmitHandler = async (newPost: IPost)  => {

        const formData = new FormData()
        formData.append('title', newPost.title)
        formData.append("body", newPost.body)
        // @ts-ignore
        formData.append("thumbnail", newPost.thumbnail[0])

        await axios.post<IPost>("http://localhost:8000/post/", formData).then((res) => {
            toast({
                title: "Added new post successfully",
                status: "success",
                isClosable: true,
                duration: 5000,
                position: "top"
            })
            reset()
        }).catch((err) => {
            toast({
                title: "Error added new post",
                status: "error",
                isClosable: true,
                duration: 5000,
                position: "top"
            })
            console.log(err)
        })

    }

    const bodyContent = watch("body")

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>

            <VStack spacing="11px">
                <FormControl isInvalid={Boolean(errors.thumbnail)}>
                    <input type="file" {...register("thumbnail")} accept="image/*" />
                    <FormErrorMessage>
                        {errors.thumbnail && errors.thumbnail.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.title)}>
                    <Input type="text" {...register("title")} placeholder="New post title here..." />
                    <FormErrorMessage>
                        {errors.title && errors.title.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.body)}>
                    <ReactQuill theme="snow" value={bodyContent} onChange={onBodyStateChange} placeholder="write your post here..." modules={modules} formats={formats}  />
                    <FormErrorMessage>
                        {errors.body && errors.body.message}
                    </FormErrorMessage>
                </FormControl>
            </VStack>
            <Button type="submit" isLoading={isSubmitting} colorScheme="purple" mt={5} size="sm">
                Publish
            </Button>
        </form>
    )

}

export  default CreateNewFormPost