import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { AppRoute } from '../../constants';
import Main from '../Main/Main';
import About from '../About/About';
import Catalog from '../Catalog/Catalog';
import Contacts from '../Contacts/Contacts';
import NotFound from '../NotFound/NotFound';
import Post from '../Post/Post';
import Login from '../Login/Login';
import AuthProvider from '../../hocs/AuthProvider';
import Profile from '../Profile/Profile';
import RequireAuth from '../../hocs/RequireAuth';
import CreatePost from '../CreatePost/CreatePost';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route index element={<Main />} />
            <Route path={AppRoute.About} element={<About />} />
            <Route path={AppRoute.AboutUs} element={<Navigate to={AppRoute.About} replace />} />
            <Route path={AppRoute.Catalog} element={<Catalog />} />
            <Route path={AppRoute.Contacts} element={<Contacts />} />
            <Route path={AppRoute.Post} element={<Post />} />
            <Route path={AppRoute.Profile} element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path={AppRoute.Login} element={<Login />} />
            <Route path={AppRoute.CreatePost} element={<RequireAuth><CreatePost/></RequireAuth>} />
            <Route path={AppRoute.NotFound} element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
