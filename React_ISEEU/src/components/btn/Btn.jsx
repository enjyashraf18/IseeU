import React from 'react';
import "./btn.css";
import { Table, Form, InputGroup, Border } from 'react-bootstrap';
import { text } from '@fortawesome/fontawesome-svg-core';
const Btn = (props) => {
  const handleClick = props.onclick
  return (
    <div className='btn'>
      <button label= {props.label} type={props.type} onClick={handleClick}>
        {props.label}
      </button>
   
    </div>
  )
}

export default Btn
