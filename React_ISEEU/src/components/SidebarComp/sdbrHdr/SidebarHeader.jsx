import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

import { Link,NavLink } from 'react-router-dom';

const SidebarHeader = (props) => {
  return (
    <div id='sidebarHeadr'>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
          <span id ="iseeu">IseeU</span>
          
          </a>
          <span>
          <text id="heaerTitle">{props.role}<br/>Welcom back {props.name}</text>
          </span>
        </CDBSidebarHeader> 
        </div>
  )
}

export default SidebarHeader
