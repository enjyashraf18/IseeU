import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SidebarComp.css'; // Import CSS for styles
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ProSide = (prop) => {
    const navigate = useNavigate();
    const role = prop.data; // This should ideally come from props or context

    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (item) => {
        setActiveItem(item);
        console.log(item.label);
        navigate(`/${item.label}`);
    };

    const adminSidebarItems = [
        { id: 1, label: 'Admin View', icon: 'fa-solid fa-user-shield' ,link:'' },
        { id: 2, label: 'Staff', icon: 'fa-solid fa-users',link:''  },
        { id: 3, label: 'Patient Analysis', icon: 'fa-solid fa-chart-line',link:''  },
        { id: 4, label: 'Contact', icon: 'fa-solid fa-envelope',link:'' },
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

    const sidebarItems = role === "admin"
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
