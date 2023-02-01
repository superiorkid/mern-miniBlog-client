import React, {ChangeEvent, FC, useEffect, useState} from "react";
import Layout from "../../components/Layout/Layout";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup'
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Box,
    VStack,
    Card,
    CardHeader,
    CardBody,
    Heading, Spacer, Divider, Textarea, Button, Flex
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'



const schema = yup.object({
    title: yup.string().required(),
    body: yup.string().required(),
    // thumbnail: yup.mixed().required("File is required.")
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

const WriteNewArticle: FC = () => {
    const {handleSubmit, register, formState: {errors, isSubmitting}, reset, watch, setValue} = useForm<IPost>({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        register("body", {required: true})
    }, [register])

    const onBodyStateChange = (editorState: any) => {
        setValue("body", editorState)
    }

    const onSubmitHandler = (newPost: IPost)  => {
        console.log(newPost)
        reset()
    }

    const bodyContent = watch("body")

    return (
        <Layout>
            <Box p="3px"></Box>
            <Card>
                <CardHeader>
                    <Heading size="lg">Write new article</Heading>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>

                        <VStack spacing="8px">
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
                </CardBody>
            </Card>
        </Layout>
    )
}

export default WriteNewArticle