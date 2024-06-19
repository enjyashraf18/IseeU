import React from 'react';
import "./checkbox.css";
import { useState } from 'react';


const Checkbox = ({ checked, onChange }) => (
  <div className='check'>
    <input
      type='checkbox'
      className='checkbox'
      checked={checked}
      onChange={onChange}
    />
  </div>
);



export default Checkbox
