import React, { useState } from 'react';
import './Login.css'; // Assuming you have some custom CSS here
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { OR,MBut,DEL,Search,UserText1,UserText2,UserAge,CheckBox,OpenLi,EmerBtn,Btn,LiBTN } from '../../components';


function Login() {
  const { register, handleSubmit,reset ,formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset()
  };


const submitForm = (data) => {
      const body = {
          email: data.email,
          password: data.password
      }

      const requestOptions = {
          method: "POST",
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(body)
      }

      fetch('/auth/login', requestOptions)
      .then(res => res.json())
      .then(data =>{
          console.log(data)
          // setServerResponse(data.message)
          // setShow(true)
      })
      .catch(err => console.log(err))

  reset()
    }




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

