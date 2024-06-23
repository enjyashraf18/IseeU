import React, { useState,useContext } from 'react';
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

  const { user, setsser } = useState();
  localStorage.clear()
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
      
      console.log(response.data.user.role);
      if (response.data.message === "Login successful") {
        // Redirect to another route, e.g., /dashboard
        const userdata = response.data.user
        localStorage.clear()
        localStorage.setItem('user', JSON.stringify(userdata));
        console.log(localStorage.getItem('user'))

        if(response.data.user.role === 'Admin'){
        navigate('/admindashboard')
        console.log(user)
        ;}
        if(response.data.user.role=== "Doctor"){
          navigate('/doctordashboard');}
          else if(response.data.user.role === 'Nurse'){
            navigate('/nursedashboard',{replace: true},{state: user});}
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
      <div className={"row"} id={"LoginCont"}>
   
        <div id="left" className={"col-7"}>
        <div 
        style=
        {{

        fontFamily: "'Radio Canada'",
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '180px',
        lineHeight: '120.69%',
        color: '#e0e0e0'}}
        >ISEE<br></br></div>
        <div
          style=
          {{
          marginleft: "5px",
          fontFamily: "'Radio Canada'",
          fontStyle: 'normal',
          fontWeight: 2000,
          fontSize: '450px',
          lineHeight: '70%',
          color: '#e0e0e0'}}
        >U
        </div>
        </div>
        <div id="right" className={"col-5"}>

          <div id="InputContainer">
          <div>
        <h1 style={{
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

            <Button id="submitBtn" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Link to='/register'>New Admin? Register</Link>
        </div>
        </div>
        </div>
    </Container>

  );
}

export default Login;

