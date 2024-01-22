export type TPost = {
  category: string;
  content: string;
  id: 2;
  image: string;
  publishedAt: string;
  slug: string;
  status: string;
  thumbnail: string;
  title: string;
  updatedAt: string;
  url: string;
  userId: 2;
};

export type TUser = {
  name: string | null,
  email: string | null,
  password: string | null,
}

export type TValue = {
  user: TUser;
  signIn: (name: string, email: string, password: string) => void;
  signOut: () => void;
}


