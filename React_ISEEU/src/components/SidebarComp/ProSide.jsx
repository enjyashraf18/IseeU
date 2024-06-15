import React, { useState } from 'react';

const ProSide = (props) => {
    const role = props.role
    const [activeItem, setActiveItem] = useState(null);
    const onSidebarItemClick = props.handleSidebarItemClick
    const handleItemClick = (item) => {
      setActiveItem(item);
      onSidebarItemClick(item.label); // Call the prop function with content label
    };
  
  const adminSidebarItems = [
    { id: 1, label: 'Login' },
    { id: 2, label: 'Register' },
    { id: 3, label: 'Patient_Analysis' },
    { id: 4, label: 'Contact' },
  ];
  const docSidebarItems = [
    { id: 1, label: 'Login' },
    { id: 2, label: 'Register' },
    { id: 3, label: 'Patient_Analysis' },
    
  ];
  const nurseSidebarItems = [
    { id: 1, label: 'Login' },
    { id: 2, label: 'Register' },
    
  ];

  const patientSidebarItems = [
    { id: 1, label: 'Login' },
    
  ];
  const sidebarItems = role === "admin"
  ? adminSidebarItems
  : role === "doctor"
  ? docSidebarItems
  : role === "nurse"
  ? nurseSidebarItems // Add your nurseSidebarItems array here
  : role === "patient"
  ? patientSidebarItems // Add your patientSidebarItems array here
  : [];

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <ul>  
          {
          sidebarItems.map((item) => (
            <li
              key={item.id}
              className={activeItem === item ? 'active' : ''}
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        {activeItem ? (
          <div>
            <h2>{activeItem.label}</h2>

          </div>
        ) : (
          <div>
            <h2>Welcome</h2>
            <p>Please select an item from the sidebar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProSide;