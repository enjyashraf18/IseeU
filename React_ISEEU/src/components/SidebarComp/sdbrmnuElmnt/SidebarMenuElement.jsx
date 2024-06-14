// SidebarMenuElement.js
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CDBSidebarMenuItem } from 'cdbreact';
import './SidebarMenuElement.css';
import { Login } from '../../../pages';

const SidebarMenuElement = ({ icon, name, onClick }) => {
  const location = useLocation();
  // const isNameInUrl = location.pathname.includes(name.toLowerCase());

  return (
    <div id="SidebarMenuElement">
      <NavLink
        exact
        // to={`/${route}`}
        className={'activeClicked'}
      >
        <CDBSidebarMenuItem icon={icon}>
          {name}
        </CDBSidebarMenuItem>
      </NavLink>
    </div>
  );
};

export default SidebarMenuElement;
