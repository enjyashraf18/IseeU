
import React, { useState, useEffect } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import './SidebarComp.css'; // Import CSS for styles
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ProSide = (prop) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    const role = user.role ; // This should ideally come from props or context

    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (item) => {
        console.log(item.label);
        navigate(`${item.link}`,{replace: true});
        setActiveItem(item);


    };

    const adminSidebarItems = [
        { id: 1, label: 'Admin Dashboard', icon: 'fa-solid fa-user-shield' ,link:'/admindashboard' },
        { id: 2, label: 'Doctors', icon: 'fa-solid fa-users',link:'/doctorsdata'  },
        { id: 2, label: 'Nurses', icon: 'fa-solid fa-users',link:'/nursesdata'  },
        { id: 3, label: 'Current Encounters', icon: 'fa-solid fa-chart-line',link:'/currentencounters'  },
        { id: 3, label: 'Encounters History', icon: 'fa-solid fa-chart-line',link:''  },
        { id: 4, label: 'All Patients', icon: 'fa-solid fa-envelope',link:'' },
        { id: 4, label: 'Devices', icon: 'fa-solid fa-envelope',link:'' },

    ];

    const docSidebarItems = [
        { id: 1, label: 'Doctor View', icon: 'fa-solid fa-user-md' },
        { id: 2, label: 'Patient Analysis', icon: 'fa-solid fa-chart-line' },    
    ];

    const nurseSidebarItems = [
        { id: 1, label: 'Login', icon: 'fa-solid fa-sign-in-alt' },
        { id: 2, label: 'Register', icon: 'fa-solid fa-user-plus' },
    ];

    const patientSidebarItems = [
        { id: 1, label: 'Login', icon: 'fa-solid fa-sign-in-alt' },
    ];

    const sidebarItems = role === "Admin"
        ? adminSidebarItems
        : role === "doctor"
            ? docSidebarItems
            : role === "nurse"
                ? nurseSidebarItems
                : role === "patient"
                    ? patientSidebarItems
                    : [];

    return (
      <Col>
        <div className="sidebar-container">
            <div className="sidebar">
                <ul className="sidebar-list">
                    {sidebarItems.map((item) => (
                        <li
                            key={item.id}
                            className={`sidebar-element ${activeItem === item ? 'active' : ''}`}
                            onClick={() => handleItemClick(item)}
                        >
                            <label className="sidebar-link">
                                <i className={item.icon}></i>
                                <span className="sidebar-label">{item.label}</span>
                            </label>
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
                        
                    </div>
                )}
            </div>
        </div>
        </Col>
    );
};

export default ProSide;
