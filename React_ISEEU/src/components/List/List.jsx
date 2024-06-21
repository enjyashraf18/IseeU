import React from 'react';
import './list.css';

const List = ( props ) => {
    return (
        <div className='List' hidden={props.hidden}>
            <p>{props.label}</p>
            <select disabled={props.disabled} name = {props.name}  value={props.value} onChange={props.onChange}>
                <option> ---choose ---</option>
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
