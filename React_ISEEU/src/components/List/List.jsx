import React from 'react';
import './list.css';

const List = ( props ) => {
    return (
        <div className='List'>
            <p>{props.label}</p>
            <select name = {props.label}>
                {props.options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default List;
