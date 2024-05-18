import React from 'react';
import "./emergency.css";
const Emergencybtn = (props) => {
  return (
    <div className='emergency'>
      <button className='emerbtn'>
          {props.label}
      </button>
    </div>
  )
}

export default Emergencybtn
