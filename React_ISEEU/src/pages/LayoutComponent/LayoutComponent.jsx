// LayoutComponent.js
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CDBSidebar,CDBSidebarMenu, CDBSidebarMenuItem,CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader } from 'cdbreact';
import { ProSide } from '../../components';
import Patient_Analysis from '../patientsAnalysis/PatientAnalysis'
import Login from '../LoginPage/Login';
import Register  from '../RegisterPage/RegisterPage';

// Ensure this path is correct
// import './LayoutComponent.css';

const LayoutComponent = ({ children }) => {


  return (
    <Container fluid>
      <Row>
        <Col md={2} className="d-none d-md-block bg-light sidebar">
          <ProSide onSidebarItemClick={handleSidebarItemClick} /> {/* Pass callback prop */}
        </Col>

        <Col md={10} className="ml-sm-auto col-lg-10 px-4">
          {activeContent === 'Patient_Analysis' ? <Patient_Analysis /> : null} 

          {activeContent === 'Login' ? <Login /> : null} 
          {activeContent === 'Register' ? <Register /> : null}
        </Col>
      </Row>
    </Container>
  );
};

export default LayoutComponent;
