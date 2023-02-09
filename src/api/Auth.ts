import axios from "axios";

const baseUrl = "http://localhost:8000/post/";

export const userLogin = async ({ email, password }: IUser) => {
  const { data } = await axios.post(baseUrl + "login", { email, password });
  return data.data;
};

export const userRegister = async ({ username, email, password }: IUser) => {
  const { data } = await axios.post(baseUrl, { username, email, password });
  return data.data;
};
