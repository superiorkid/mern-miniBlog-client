interface IPost {
    title: string,
    body: string,
    slug: string,
    thumbnail: File | string,
    createdAt: Date,
    updatedAt: Date
}