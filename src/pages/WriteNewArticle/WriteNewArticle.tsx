import React, {FC} from "react";
import Layout from "../../components/Layout/Layout";
import {
    Card,
    CardHeader,
    CardBody,
    Heading,
} from "@chakra-ui/react";
import 'react-quill/dist/quill.snow.css'
import CreateNewFormPost from "../../components/CreateNewPostForm/CreateNewFormPost";


const WriteNewArticle: FC = () => {
       return (
        <Layout>
            <Card>
                <CardHeader>
                    <Heading size="lg">Write new article</Heading>
                </CardHeader>
                <CardBody>
                    <CreateNewFormPost/>
                </CardBody>
            </Card>
        </Layout>
    )
}
