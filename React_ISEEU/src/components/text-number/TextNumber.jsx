import React from 'react';
import "./textnumber.css";
const TextNumber = (props) => {
  return (
    <div className='text-num'>
      <p>{props.label}</p>
      <input type='number' placeholder=''/>
    </div>
  )
}

export default TextNumber
