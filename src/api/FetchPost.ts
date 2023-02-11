import axios from "axios";
import { isPlainObject } from "react-query/types/core/utils";
import { string } from "yup";

const baseUrl = "http://localhost:8000/post/";

interface fetchPostResponse {
  data: IPost[];
}

interface fetchSingleResponse {
  data: IPost;
}

export const fetchPosts = async () => {
  const { data } = await axios.get<fetchPostResponse>(baseUrl);
  return data.data;
};

export const fetchSinglePost = async (slug: string | undefined) => {
  const { data } = await axios.get<fetchSingleResponse>(baseUrl + slug);
  return data.data;
};

export const deletePostFn = async (id: string) => {
  const { data } = await axios.delete(baseUrl + id, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return data.data;
};

export const updatePostFn = async ({
  id,
  newPost,
}: {
  id: string;
  newPost: IPost;
}) => {
  const { data } = await axios.put(baseUrl + id, newPost, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return data.data;
};

export const createPostFn = async (newPost: IPost) => {
  const { data } = await axios.post(baseUrl, newPost, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  return data.data;
};
