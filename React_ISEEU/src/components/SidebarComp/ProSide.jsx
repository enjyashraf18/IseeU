
import React, { useState, useEffect } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import './SidebarComp.css'; // Import CSS for styles
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ProSide = (prop) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    const role = "Admin" ;// This should ideally come from props or context

    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (item) => {

        console.log(item.label);
        if(item.label === 'Logout') {
          localStorage.clear();
          navigate(`/login`);

        }
        else{

        setActiveItem(item);
        navigate(`${item.link}`);}


    };

    const adminSidebarItems = [
        { id: 1, label: 'Admin Dashboard', icon: 'fa-solid fa-user-shield' ,link:'/admindashboard' },
        { id: 2, label: 'Doctors', icon: 'fa-solid fa-users',link:"/admin/doctorsdata"  },
        { id: 3, label: 'Nurses', icon: 'fa-solid fa-users',link:"/admin/nursesdata"  },
        { id: 4, label: 'Current Encounters', icon: 'fa-solid fa-chart-line',link:"/currentencounters"  },
        { id: 6, label: 'All Patients', icon: 'fa-solid fa-envelope',link:"/admin/patients" },
        { id: 7, label: 'Equipments', icon: 'fa-solid fa-envelope',link:'/admin/equips' },
        { id: 3, label: 'My Profile', icon: 'fa-solid fa-chart-line',link:"/profile"  },


    ];

    const docSidebarItems = [
        { id: 1, label: 'Doctor Dashboard', icon: 'fa-solid fa-user-md', link:"/doctordashboard" },
        { id: 2, label: 'Current Encounters', icon: 'fa-solid fa-chart-line', link: "/currentencounters" },
        { id: 3, label: 'Reports History', icon: 'fa-solid fa-chart-line',link:"/doctor/reports"  },
        { id: 3, label: 'Investigations Tracking', icon: 'fa-solid fa-chart-line',link:"/doctor/investigations"  },
        { id: 3, label: 'My Profile', icon: 'fa-solid fa-chart-line',link:"/profile"  },

    ];

    const nurseSidebarItems = [
        { id: 1, label: 'Nurse Dashboard', icon: 'fa-solid fa-sign-in-alt',link: "/nursedashboard" },
        { id: 2, label: 'Current Encounters', icon: 'fa-solid fa-chart-line', link: '/currentencounters' },
        { id: 3, label: 'My Profile', icon: 'fa-solid fa-chart-line',link:"/profile"  },

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
                    <li
                        key="logout"
                        className="sidebar-element"
                        onClick={() => handleItemClick({label: 'Logout', link: 'login'})}
                    >
                        <label className="sidebar-link">
                            <i className="fa-solid fa-sign-out-alt"></i>
                            <span className="sidebar-label">Logout</span>
                        </label>
                    </li>
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
