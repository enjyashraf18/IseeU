import React from 'react';
import { FaPlus } from 'react-icons/fa'; // Importing Plus icon from react-icons
import "./Card.css";

const Card = (props) => {
    return (
        <div className="Card" onClick={props.onClick}>
            {props.typeAdd ? (
                <div className="card-add">
                    <FaPlus className="plus-icon" />
                </div>
            ) : (
                <>
                    <img className="card-img" src="https://placehold.co/600x250" alt="Placeholder" />
                    <div className="card-body">
                        <p className="infoHead">Name</p>
                        <p className="cardInfo">{props.data[0]} {props.data[1]}</p>
                        <p className="infoHead">Age</p>
                        <p className="cardInfo">{props.data[2]}</p>
                        <p className="infoHead">Role</p>
                        <p className="cardInfo">{props.data[3]}</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;
