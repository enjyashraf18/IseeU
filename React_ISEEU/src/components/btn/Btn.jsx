import React from 'react';
import "./btn.css";
const Btn = (props) => {
  return (
    <div className='btn'>
      <button> {props.label} </button>
    </div>
  )
}

export default Btn
