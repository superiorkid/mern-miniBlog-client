import axios from 'axios'

const baseUrl = "http://localhost:8000/post/"

interface fetchPostResponse {
    data: IPost[]
}

interface fetchSingleResponse {
    data: IPost
}

export const fetchPosts = async () => {
    const {data} = await axios.get<fetchPostResponse>(baseUrl)
    return data.data
}

export const fetchSinglePost = async (slug: string | undefined) => {
    const {data} = await axios.get<fetchSingleResponse>(baseUrl + slug)
    return data.data
}