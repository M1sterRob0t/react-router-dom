import React from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { AppRoute } from '../../constants';
import Main from '../Main/Main';
import About from '../About/About';
import Catalog from '../Catalog/Catalog';
import Contacts from '../Contacts/Contacts';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<Main />} />
          <Route path={AppRoute.About} element={<About />} />
          <Route path={AppRoute.Catalog} element={<Catalog />} />
          <Route path={AppRoute.Contacts} element={<Contacts />} />
          <Route path={AppRoute.NotFound} element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
