import axios from 'axios'

const baseUrl = "http://localhost:8000/post/"

interface fetchPostResponse {
    data: IPost[]
}

export const fetchPosts = async () => {
    const {data} = await axios.get<fetchPostResponse>(baseUrl)
    return data.data
}