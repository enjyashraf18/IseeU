import React from 'react';
import "./text1.css";
const Text1 = (props) => {
  return (
    <div className='text1'>
      <p>{props.label}</p>
      <input type={props.type} placeholder=''/>
    </div>
  )
}

export default Text1
