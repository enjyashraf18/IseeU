import React, { useState } from 'react';
import './Login.css'; // Assuming you have some custom CSS here
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login() {
  const { register, handleSubmit,reset ,formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset()
  };


  
  return (
    <div id='fullPage'>
      <Row>
        <Col id="rightCol" md={8} >
          <h2>Welcome Back!</h2>
          <p>Please login to your account.</p>
        </Col>
        <Col id="container" md={4}>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email"
                {...register("email", { required: true, maxLength: 80 })}
              />
              {errors.email && <span >Email is required</span>}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password"
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors.password && <span>Password is required</span>}
              {errors.password?.type === "minLength" && <p style={{ color: "red" }}><small>Min characters should be 8</small></p>}

            </Form.Group>

            <Button 
            as= "sub" 
            variant="primary" 
            type="submit"
            onClick={handleSubmit(onSubmit)} >
              Submit
            </Button>
          </Form>
          <Link to='/register'>New Admin? Register</Link>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
