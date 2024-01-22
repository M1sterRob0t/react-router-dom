export enum AppRoute {
    Root = '/',
    About = 'about',
    AboutUs = 'about-us',
    Contacts = 'contacts',
    Posts = 'posts',
    Users = 'users',
    Post = 'posts/:id',
    Login = 'login',
    Profile = 'profile',
    Create = 'create',
    CreatePost = 'post',
    CreateUser = 'user',
    NotFound = '*',
}

export const BASE_URL = 'https://jsonplaceholder.org/';

export enum Endpoints {
  Posts = 'posts/',
  Users = 'users/'
}
