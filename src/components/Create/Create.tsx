import React from 'react';
import { AppRoute } from '../../constants';
import { Link, Outlet } from 'react-router-dom';
import './Create.css';

function Create() {
  return (
    <div className="create">
      <h1>This is create page</h1>
      <ul>
        <li><Link to={AppRoute.CreatePost}>Create Post</Link></li>
        <li><Link to={AppRoute.CreateUser}>Create User</Link></li>
      </ul>

      <Outlet />
    </div>
  );
}

export default Create;
