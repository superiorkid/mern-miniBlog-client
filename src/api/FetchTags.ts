import axios from "axios";

const baseUrl = "http://localhost:8000/post/tag";

export const fetchTagsFn = async () => {
  const { data } = await axios.get(baseUrl);
  return data.data;
};