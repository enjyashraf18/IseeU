import React from 'react';
import "./orButton.css";

const OrButton = () => {
    return (
        <div className="ORBUtContainer">
            <p id="genderP">Gender</p>
            <div className="ORBUt">
                <button className="M">Male</button>
                <button className="ORO">OR</button>
                <button className="F">Female</button>
            </div>
        </div>
    );
}

export default OrButton;

