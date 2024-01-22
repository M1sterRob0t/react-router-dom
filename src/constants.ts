export enum AppRoute {
    Root = '/',
    About = '/about',
    AboutUs = '/about-us',
    Contacts = '/contacts',
    Catalog = '/catalog',
    Post = '/posts/:id',
    Posts = '/posts/',
    Login = '/login',
    Profile = '/profile',
    CreatePost = '/create-post',
    NotFound = '*',
}

export const BASE_URL = 'https://jsonplaceholder.org/';

export enum Endpoints {
  Posts = '/posts/'
}
