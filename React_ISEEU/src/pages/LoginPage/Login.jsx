import React, { useState } from 'react';
import './Login.css'; // Assuming you have some custom CSS here
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ProSide } from '../../components';

function Login() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [role, setRole] = useState("Admin")

  const onSubmit = (data) => {
    const body = {
      email: data.email,
      password: data.password
    };

    axios.post('http://localhost:5000/login', body, {
      headers: {      
        'Content-Type': 'application/json'
      }
    })

    .then(response => {
      console.log(response.data);
      if (response.data.message === "Login successful") {
        // Redirect to another route, e.g., /dashboard
        setRole(data.role)
        navigate('/');
      } else {
        // Handle login failure, show error message etc.
        console.log('Login failed');
      }
      // setServerResponse(response.data.message);
      // setShow(true);
    })
    
    .catch(error => {
      console.log(error);
    });

    reset();
  };
  const [activeContent, setActiveContent] = useState('Home'); // Default content

  // const handleSidebarItemClick = (content) => {
  //   setActiveContent(content);
  //   navigate(activeContent);

  // };


// {message: 'Login successful', user: {…}}
// message
// : 
// "Login successful"
// user
// : 
// address
// : 
// null
// datehired
// : 
// null
// dateleft
// : 
// null
// dateofbirth
// : 
// null
// emailaddress
// : 
// "user1@example.com"
// employeeid
// : 
// 25
// firstname
// : 
// "John"
// gender
// : 
// "Male"
// lastname
// : 
// null
// nid
// : 
// "123456789"
// password
// : 
// "password123"
// phonenumber
// : 
// null
// profilepic
// : 
// null
// role
// : 
// "Doctor"
// username
// : 
// "user1"


  return (
    <Container fluid id='fullPage'>
      <Row>
   
        <div id="left">
        <Col  xl={6}>
        <div 
        style=
        {{width: '307px',
        height: '115px',

        fontFamily: "'Radio Canada'",
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '95px',
        lineHeight: '120.69%',
        color: '#e0e0e0'}}
        >ISEE<br></br></div>
        <div
          style=
          {{
          width: '307px',
          height: '115px',
          marginleft: "5px",
          fontFamily: "'Radio Canada'",
          fontStyle: 'normal',
          fontWeight: 2000,
          fontSize: '380px',
          lineHeight: '70%',
          color: '#e0e0e0'}}
        >U
        </div>
        </Col>
        </div>
        <Col id="right"xl={6}>
        <div>
        <h1 style={{
          width: '307px',
          height: '115px',

          fontFamily: "'Radio Canada'",
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '95px',
          lineHeight: '120.69%',
          color: '#258176',
          }}>Login</h1>
          </div>
          <Form id= "loginForm"onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicEmail" className="form-group">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email" 
                placeholder="Enter email"
                {...register("email", { required: true, maxLength: 80 })}
              />
              {errors.email && <span >Email is required</span>}
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="form-group">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password"
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors.password && <span>Password is required</span>}
              {errors.password?.type === "minLength" && <p style={{ color: "red" }}><small>Min characters should be 8</small></p>}

            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Link to='/register'>New Admin? Register</Link>
        </Col>
        </Row>
    </Container>
  );
}

export default Login;

