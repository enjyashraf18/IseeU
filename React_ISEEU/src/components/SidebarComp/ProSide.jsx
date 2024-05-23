import React, { useState } from 'react';

const ProSide = ({ onSidebarItemClick }) => {
    const [activeItem, setActiveItem] = useState(null);
  
    const handleItemClick = (item) => {
      setActiveItem(item);
      onSidebarItemClick(item.label); // Call the prop function with content label
    };
  
  const sidebarItems = [
    { id: 1, label: 'Login' },
    { id: 2, label: 'Register' },
    { id: 3, label: 'Services' },
    { id: 4, label: 'Contact' },
  ];

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <ul>
          {sidebarItems.map((item) => (
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