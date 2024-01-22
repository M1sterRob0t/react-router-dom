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

export type TAuthInfo = {
  name: string | null,
  email: string | null,
  password: string | null,
}

export type TValue = {
  user: TAuthInfo;
  signIn: (name: string, email: string, password: string) => void;
  signOut: () => void;
}

export interface TUser {
  id: number
  firstname: string
  lastname: string
  email: string
  birthDate: string
  login: Login
  address: Address
  phone: string
  website: string
  company: Company
}

export interface Login {
  uuid: string
  username: string
  password: string
  md5: string
  sha1: string
  registered: string
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Geo {
  lat: string
  lng: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}
