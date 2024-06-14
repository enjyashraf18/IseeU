import React, {useState} from 'react';
import "./Card.css";
const Card = (props) => {

    return (<div className={"Card"}>
        <img className="card-img" src={"https://placehold.co/600x250"} />
        <div className={"card-body"}>
            <p className={"infoHead"}>Name</p>
            <p className={"cardInfo"}>{props.data[0]} {props.data[1]}</p>
            <p className={"infoHead"}>Age</p>
            <p className={"cardInfo"}>{props.data[2]}</p>
            <p className={"infoHead"}>Gender</p>
            <p className={"cardInfo"}>{props.data[3]}</p>
        </div>
    </div>)
}

export default Card
