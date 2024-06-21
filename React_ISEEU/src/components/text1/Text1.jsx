import React from 'react';
import "./text1.css";
const Text1 = (props) => {
  return (
    <div className='text1'>
      <p hidden={props.hidden}>{props.label}</p>
      <input name ={props.name} type={props.type} value= {props.value} onChange={props.onChange} disabled={props.disabled} hidden={props.hidden}/>
    </div>
  )
}

export default Text1
