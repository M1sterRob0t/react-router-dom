import './App.css';
import Layout from '../Layout/Layout';
import { AppRoute } from '../../constants';
import Main from '../Main/Main';
import About from '../About/About';
import Posts, { postsLoader } from '../Posts/Posts';
import Contacts from '../Contacts/Contacts';
import NotFound from '../NotFound/NotFound';
import Post, { postLoader } from '../Post/Post';
import Login from '../Login/Login';
import AuthProvider from '../../hocs/AuthProvider';
import Profile from '../Profile/Profile';
import RequireAuth from '../../hocs/RequireAuth';
import Users from '../Users/Users';
import CreateUser from '../CreateUser/CreateUser';
import CreatePost from '../CreatePost/CreatePost';
import Create from '../Create/Create';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'} element={<Layout />} errorElement={<h1 style={{textAlign: 'center', margin: '100px auto'}}>Something went terribly wrong...</h1>}>
      <Route index element={<Main />} />
      <Route path={AppRoute.About} element={<About />} />
      <Route path={AppRoute.AboutUs} element={<Navigate to={AppRoute.About} replace />} />

      <Route path={AppRoute.Posts} element={<Posts />} loader={postsLoader} errorElement={<ErrorBoundary />}/>
      <Route path={AppRoute.Post} element={<Post />} loader={postLoader} errorElement={<ErrorBoundary />}/>
      <Route path={AppRoute.Users} element={<Users />} />
      <Route path={AppRoute.Contacts} element={<Contacts />} />
      <Route
        path={AppRoute.Profile}
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route path={AppRoute.Login} element={<Login />} />
      <Route
        path={AppRoute.Create}
        element={
          <RequireAuth>
            <Create />
          </RequireAuth>
        }
      >
        <Route path={AppRoute.CreatePost} element={<CreatePost />} />
        <Route path={AppRoute.CreateUser} element={<CreateUser />} />
      </Route>
      <Route path={AppRoute.NotFound} element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
