import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AppRoute } from '../../constants';
import logo from './logo.svg';
import './Header.css';
import { useAuth } from '../../hooks/useAuth';

const LINK_CLASS_NAME = 'header__link';
const LINK_ACTIVE_CLASS_NAME = 'header__link--active';
const LINK_PENDING_CLASS_NAME = 'header__link--pending';

interface IgetClassName {
  isActive: boolean;
  isPending: boolean;
}

function getClassName({ isActive, isPending }: IgetClassName): string {
  return `${LINK_CLASS_NAME} ${isPending ? LINK_PENDING_CLASS_NAME : isActive ? LINK_ACTIVE_CLASS_NAME : ''}`;
}

function Header() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="logo" />
      <nav className="header__nav">
        <NavLink to={AppRoute.Root} className={getClassName}>
          Main
        </NavLink>
        <NavLink to={AppRoute.About} className={getClassName}>
          About
        </NavLink>
        <NavLink to={AppRoute.Contacts} className={getClassName}>
          Contacts
        </NavLink>
        <NavLink to={AppRoute.Posts} className={getClassName}>
          Posts
        </NavLink>
        <NavLink to={AppRoute.Create} className={getClassName}>
          Create
        </NavLink>
        <NavLink to={AppRoute.Users} className={getClassName}>
          Users
        </NavLink>
      </nav>
      {user.name ? (
        <nav className="header__user-nav">
          <NavLink to={AppRoute.Profile} className={getClassName}>
            Profile
          </NavLink>
          <a href='#' className={LINK_CLASS_NAME} onClick={() => signOut()}>
            Log out
          </a>
        </nav>
      ) : (
        <nav className="header__user-nav">
          <NavLink to={AppRoute.Login} className={getClassName} state={location.pathname}>
            Log in
          </NavLink>
        </nav>
      )}
    </header>
  );
}

export default Header;
