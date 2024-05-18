import React from 'react';

const Form = (props) => {
  const data = props.data;
  
  return (
    <div>
      {data.map((label, label_index) => (
        <form key={label_index}>
          <label htmlFor={label}>{`${label}:`}</label>
          <input type="text" id={label} name={label} />
        </form>
      ))}
    </div>
  );
};

export default Form;
