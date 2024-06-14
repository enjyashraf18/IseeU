import React from 'react';
import "./btn.css";
import { Table, Form, InputGroup, Button,Border } from 'react-bootstrap';
const Btn = (props) => {
  const label =props.data
  return (
    <div className='btn'>
      <Button>{label}</Button>
   
    </div>
  )
}

export default Btn
