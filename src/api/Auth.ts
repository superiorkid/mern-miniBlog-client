import axios from "axios";

const baseUrl = 'http://localhost:8000/auth/'

export const userLogin = async ({email, password}: IUser) => {
    const {data} = await axios.post(baseUrl + 'login', {email, password})
    return data.data
}

export const userRegister = async ({username, email, password, confirmPassword}: IUser) => {
    const {data} = await axios.post(baseUrl + 'signup', {username, email, password, confirmPassword})
    return data.data
}