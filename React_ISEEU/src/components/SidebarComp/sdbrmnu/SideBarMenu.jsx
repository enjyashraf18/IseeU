// SideBarMenu.js
import React from 'react';
import { CDBSidebarMenu } from 'cdbreact';
import SidebarMenuElement from '../sdbrmnuElmnt/SidebarMenuElement';
import { Login, Register } from '../../../pages';
import './SideBarMenu.css';

const SideBarMenu = ({ onMenuItemClick }) => {
  const handleMenuItemClick = (Component) => {
    onMenuItemClick(Component); // Update selected menu item state
  };

  return (
    <div id="sideBarMenu">
      <CDBSidebarMenu>
        <SidebarMenuElement
          icon="icon"
          name="Menu Item 1"
          onClick={() => handleMenuItemClick(<Login />)}
        />
        <SidebarMenuElement
          icon="icon"
          name="Menu Item 2"
          onClick={() => handleMenuItemClick(<Register />)}
        />
      </CDBSidebarMenu>
    </div>
  );
};

export default SideBarMenu;
