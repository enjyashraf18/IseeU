// SidebarMenuElement.js
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CDBSidebarMenuItem } from 'cdbreact';
import './SidebarMenuElement.css';

const SidebarMenuElement = (props) => {
  const location = useLocation();
  // const isNameInUrl = location.pathname.includes(name.toLowerCase());
  id = props.id

  return (
    <div id="SidebarMenuElement">
      <li
        key={id}
        className={activeItem === item ? 'active' : ''}
        onClick={() => handleItemClick(item)}
      >
        <Link to={`http://localhost:3000/${item.label}`}>{item.label}</Link>
      </li>
    </div>
  );
};

export default SidebarMenuElement;
