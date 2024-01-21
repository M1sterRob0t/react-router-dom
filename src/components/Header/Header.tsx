import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../constants';
import logo from './logo.svg';
import './Header.css';

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
        <NavLink to={AppRoute.Catalog} className={getClassName}>
          Catalog
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
