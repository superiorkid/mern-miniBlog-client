interface IPost {
    title: string,
    body: string,
    slug: string,
    thumbnail: File | string,
    createdAt: Date,
    updatedAt: Date,
    author: IUser
}

interface IUser {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}