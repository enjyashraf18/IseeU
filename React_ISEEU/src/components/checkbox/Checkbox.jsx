import React from 'react';
import "./checkbox.css";
import { useState } from 'react';


const Checkbox = () => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);

  const handleChange1 = (event) => {
    setChecked1(event.target.checked);
  };
  const handleChange2 = (event) => {
    setChecked2(event.target.checked);
  };


  return (


    <div className='check'>
      <input type='checkbox' className='checkbox'
      checked={checked1}
      onChange={handleChange1}
      
      
      />
        <input type='checkbox' className='checkbox'
      checked={checked2}
      onChange={handleChange2}
      
      
      />
    </div>
  )
}


export default Checkbox
