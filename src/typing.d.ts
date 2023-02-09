
interface IPost {
  id: string;
  title: string;
  body: string;
  slug: string;
  thumbnail?: string | {
    [index: string]: string
  };
  createdAt: Date;
  updatedAt: Date;
  author: IUser;
  tags: ITag[] | string;
}

interface IUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ITag {
  name: string;
}
