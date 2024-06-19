import React from 'react';
import "./emergency.css";
const Emergencybtn = (props) => {
  const handleClick = props.onclick
  return (
    <div className='emergency'>
       <button label= {props.label} type={props.type} onClick={handleClick} className='emerbtn'>
        {props.label}
      </button>
    </div>
  )
}

export default Emergencybtn
