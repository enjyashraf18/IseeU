import React from 'react';
import "./btn.css";
<<<<<<< HEAD
import { Table, Form, InputGroup, Button,Border } from 'react-bootstrap';
const Btn = (props) => {
  const label =props.data
  return (
    <div className='btn'>
      <Button>{label}</Button>
=======
import { Table, Form, InputGroup, Border } from 'react-bootstrap';
import { text } from '@fortawesome/fontawesome-svg-core';
const Btn = (props) => {
  const handleClick = props.onclick
  return (
    <div className='btn'>
      <button label= {props.label} type={props.type} onClick={handleClick}>
        {props.label}
      </button>
>>>>>>> main
   
    </div>
  )
}

export default Btn
