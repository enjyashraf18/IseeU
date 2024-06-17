import React, { useState } from 'react';
import "./RegisterPage.css";
import { UserText1, Btn } from '../../components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ProSide } from '../../components';


const Register = () => {
  const [formData, setFormData] = useState({
    NID: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      console.log("FormData before sending:", formData);

      console.log("Navigating with NID:", formData.NID);
      localStorage.setItem('formData', JSON.stringify(formData));
      navigate('/RegisterPage2');

    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <Container fluid id="container">
      <Row>
        <Col md={2} className="d-none d-md-block bg-light sidebar">
          <ProSide /> {/* Pass callback prop */}
        </Col>
        <div>
        <Col  xl={6}>

        <p id="title">New Admin</p>
        <div id="regForm" className="col-7 mx-auto">
          <form>
            <p id="secondTitle">Access Info</p>
            <UserText1 label="National ID" name="NID" type="text" onChange={handleChange} />
            <UserText1 label="Username" name="username" type="text" onChange={handleChange} />
            <UserText1 label="Password" name="password" type="password" onChange={handleChange} />
            <UserText1 label="Confirm Password" name="confirmPassword" type="password" onChange={handleChange} />

          </form>
          <div id="btnDiv" className="offset-9">
            <button id="nxtBtn" label="Next" type = "submit" onClick = {handleSubmit} />
         
            </div>
        </div>
        </Col>
        </div>
        </Row>
        </Container>
  );
};

export default Register;
