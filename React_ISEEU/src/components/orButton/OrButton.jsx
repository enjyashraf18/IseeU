import React, { useEffect } from 'react';
import "./orButton.css";
import {OR} from "../index";

const OrButton = ({ formData, onChange }) => {
    useEffect(() => {
        console.log(formData.gender);
    }, [formData.gender]);

    const handleMaleClick = () => {
        onChange({ ...formData, gender: 'Male' });
    };

    const handleFemaleClick = () => {
        onChange({ ...formData, gender: 'Female' });
    };

    {//HOW TO USE
      //  <OR formData={formData} onChange={setFormData}/>
    }
    return (
        <div className="ORBUtContainer">
            <p id="genderP">Gender</p>
            <div className="ORBUt">
                <button className="M" type="button" onClick={handleMaleClick} disabled={formData.gender === 'Male'}>Male</button>
                <button className="ORO" type="button">OR</button>
                <button className="F" type="button" onClick={handleFemaleClick} disabled={formData.gender === 'Female'}>Female</button>
            </div>
        </div>
    );
}

export default OrButton;
