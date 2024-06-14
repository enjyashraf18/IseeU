import React from 'react';
import "./text1.css";
const Text1 = (props) => {
  return (
    <div className='text1'>
      <p>{props.label}</p>
      <input name ={props.name} type={props.type} placeholder='' onChange={props.onChange}/>
    </div>
  )
}

export default Text1
