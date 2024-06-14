import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterPage2.css";
import { OR, Btn, UserText1 } from '../../components';
import { useNavigate, useLocation } from 'react-router-dom';

const Register2 = () => {
    const [profileImg, setProfileImg] = useState("https://placehold.co/320x320");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        email: '',
        phone: '',
        NID: '',
        username: '',
        password: '',
        passwordConfirm: ''
    });

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log("Location state:", location.state);  // Debug statement
        if (location.state && location.state.NID) {
            setFormData((prevData) => ({
                ...prevData,
                NID: location.state.NID
            }));
        }
    }, [location.state]); // Set NID from location state

    function handleImgupload(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProfileImg(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) {
            alert("Passwords do not match");
            return;
        }
        console.log("FormData to be sent:", formData);  // Debug statement

        fetch('/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                navigate('/success'); // navigate to a success page or another route
            })
            .catch(error => {
                console.error('Error during registration:', error);
                alert('Registration failed: ' + error.message);
            });
    };

    return (
            <div className={"reg2Cont"}>
            <div className="container-fluid">
                <div className="row">
                    <div id="regForm2" className="col-10 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div id="profilePreview" className="col-3">
                                    <img src={profileImg} alt="Preview" />
                                    <input onChange={handleImgupload} type="file" />
                                    <p id="imgSpecs">snsna<br />sfasfsaa<br />ssads</p>
                                </div>
                                <div id="inputs" className="col-9">
                                    <p id="scndTitle">Personal Info</p>
                                    <div className="row">
                                            <div className="col-6">
                                                <UserText1 label="First name" type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-6">
                                                <UserText1 label="Last name" type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                                            </div>
                                    </div>
                                    <UserText1 label="Date of birth" type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
                                    <OR />
                                    <UserText1 label="Address" type="text" name="address" value={formData.address} onChange={handleInputChange} />
                                    <UserText1 label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} />
                                    <UserText1 label="Phone" type="number" name="phone" value={formData.phone} onChange={handleInputChange} />

                                    <UserText1 label="National ID" type="text" name="NID" value={formData.NID} onChange={handleInputChange} />
                                    <UserText1 label="Username" type="text" name="username" value={formData.username} onChange={handleInputChange} />
                                    <UserText1 label="Password" type="password" name="password" value={formData.password} onChange={handleInputChange} />
                                    <UserText1 label="Password Confirm" type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleInputChange} />

                                    <div className="row">
                                        <div className="col-1">
                                            <Btn label="Back" />
                                        </div>
                                        <div className="col-1 offset-8">
                                            <Btn id="nxtBtn" label="Next" type="submit" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Register2;
