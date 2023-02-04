
export const userLogin = async ({email, password}: IUser) => {
    const {data} = await axios.post(baseUrl + 'login', {email, password})
    return data.data
}