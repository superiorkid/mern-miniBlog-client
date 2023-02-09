import axios from "axios";

const baseUrl = "http://localhost:8000/auth/";

export const userLogin = async ({ email, password }: IUser) => {
  const { data } = await axios.post(baseUrl + "login/", { email, password });
  return data.data;
};

export const userRegister = async ({ username, email, password }: IUser) => {
  const { data } = await axios.post(baseUrl + "register", {
    username,
    email,
    password,
  });
  return data.data;
};
