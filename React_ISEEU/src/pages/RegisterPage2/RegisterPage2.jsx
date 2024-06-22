import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterPage2.css";
import { Btn, UserText1, OR } from '../../components'; // Assuming these are your custom components
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

const form1data = JSON.parse(localStorage.getItem('formData'));

const Register2 = () => {
    const navigate = useNavigate();

    const [firstForm, setFirstForm] = useState(form1data);
    const [profileImg, setProfileImg] = useState("https://placehold.co/320x320");

    const [formData, setFormData] = useState({
        image: null,
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        email: '',
        gender: 'male',
        phone: '',
    });

    // Handle file upload with FilePond
    const handleFileChange = (fileItems) => {
        // fileItems is an array of File objects

        if (fileItems.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImg(reader.result);
                setFormData({
                    ...formData,
                    image: fileItems.length > 0 ? reader.result: null
                });
                {console.log(reader.result)}
            };
            reader.readAsDataURL(fileItems[0].file);
        }
    };

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

        axios.post('http://localhost:5000/Register', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
                // Redirect to success page or handle response
                navigate('/success');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="reg2Cont">
            <div className="container-fluid">
                <div className="row">
                    <div id="regForm2" className="col-10 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div id="profilePreview" className="col-3">
                                    <img src={profileImg} alt="Preview" className='img-register' />
                                    <FilePond
                                        allowMultiple={false}
                                        files={formData.image ? [formData.image] : []}
                                        onupdatefiles={handleFileChange}
                                        labelIdle="Drag & Drop your picture or <span class='filepond--label-action'>Browse</span>"
                                    />
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
                                    <OR formData={formData} onChange={setFormData} />
                                    <UserText1 label="Address" type="text" name="address" value={formData.address} onChange={handleInputChange} />
                                    <UserText1 label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} />
                                    <UserText1 label="Phone" type="number" name="phone" value={formData.phone} onChange={handleInputChange} />
                                    <div className="row">
                                        <div className="col-1">
                                            <Btn label="Back" />
                                        </div>
                                        <div className="col-1 offset-8">
                                            <button id="nxtBtn" type="submit">Next</button>
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
};

export default Register2;
