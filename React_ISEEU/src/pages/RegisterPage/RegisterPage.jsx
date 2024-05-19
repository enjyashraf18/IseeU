import React, { useState } from 'react';
import "./RegisterPage.css";
import { OR, MBut, DEL, Search, UserText1, UserText2, UserAge, CheckBox, OpenLi, EmerBtn, Btn, LiBTN } from '../../components';
import { Form } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        NID: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // Uncomment the following line to navigate to another route upon success
                navigate('/success');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div id="container">
            <p id="title">New Admin</p>
            <div id="regForm" className="col-7 mx-auto">
                <Form onSubmit={handleSubmit}>
                    <p id="secondTitle">Access Info</p>
                    <UserText1 label="National ID" name="NID" type="text" onChange={handleInputChange} />
                    <UserText1 label="Username" name="username" type="text" onChange={handleInputChange} />
                    <UserText1 label="Password" name="password" type="password" onChange={handleInputChange} />
                    <UserText1 label="Confirm Password" name="confirmPassword" type="password" onChange={handleInputChange} />
                    <div id="btnDiv" className="offset-9">
                        <Btn id="nxtBtn" label="Next" type="submit" />
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register;
