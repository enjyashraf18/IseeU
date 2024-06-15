import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterPage2.css";
import { OR, Btn, UserText1 } from '../../components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'

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
    // const location = useLocation();

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
    const testFrom  = {
        firstName: 'ahmed',
        lastName: 'deeb',
        dob: '',
        address: 'hhahs',
        email: 'ahmed@gmail.coom',
        phone: '01154118292',
        NID: '30305142103532',
        username: 'ahmed',
        password: '123456789',
        passwordConfirm: '123456789',
        gender: 'male',
        dateHired: ''
    }

    useEffect(() => {

      }, []);

      const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) {
            alert("Passwords do not match");
            return;
        }            
       
        // if (localStorage.getItem('formData')) {
        //   data = JSON.parse(localStorage.getItem('formData'));

        //   console.log(formData)
        // }

        console.log("FormData to be sent:", testFrom);  // Debug statement
  
        axios.post('http://localhost:5000/Register', testFrom, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        .then(response => {
            console.log(response.data);

            // setServerResponse(response.data.message);
            // setShow(true);
            })
        // Save form data to localStorage
        // navigate('/success'); // navigate to a success page or another route if needed
                
    .catch(error => {
        console.log(error);
      });
    };
  


    return (
            <div className={"reg2Cont"}>
            <div className="container-fluid">
                <div className="row">
                    <div id="regForm2" className="col-10 mx-auto">
                        <form>
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
                                            <button id="nxtBtn" label="Next" type = "submit" onClick={handleSubmit} />
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
