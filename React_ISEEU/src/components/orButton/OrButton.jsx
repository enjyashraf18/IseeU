import React, { useState, useEffect } from 'react';
import "./orButton.css";

const OrButton = () => {
    const [gender, setGender] = useState(null);

    useEffect(() => {
        console.log(gender);
    }, [gender]);

    const handleMaleClick = () => {
        setGender('Male');
    };

    const handleFemaleClick = () => {
        setGender('Female');
    };

    return (
        <div className="ORBUtContainer">
            <p id="genderP">Gender</p>
            <div className="ORBUt">
                <button className="M" type="button" onClick={handleMaleClick}>Male</button>
                <button className="ORO" type="button">OR</button>
                <button className="F" type="button" onClick={handleFemaleClick}>Female</button>
            </div>
        </div>
    );
}

export default OrButton;
