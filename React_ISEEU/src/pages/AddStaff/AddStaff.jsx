import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddStaff.css";
import {Btn, List, OR, UserText1} from '../../components';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios'

const AddStaff = () => {
    const [profileImg, setProfileImg] = useState("https://placehold.co/500x320");
    const [cameForEdit, setCameForEdit] = useState(false); //depends on the page before
    const [formData, setFormData] = useState({
        username: '',
        password:'',
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        email: '',
        phone: '',
        NID: '',
        dateHired: '',
        role: '',
        gender: "",
        shift: ""
    });
    /**
     * NID = data.get('NID')
    username = data.get('username')
    password = data.get('password')
    firstname = data.get('firstName')
    lastname = data.get('lastName')
    dateofbirth = data.get('dob')
    address = data.get('address')
    gender = data.get('gender')
    email = data.get('email')
    phone = data.get('phone')
    datehired = data.get('dateHired')
    role = data.get('role')
     */




    const roles = ["Doctor", "Nurse"];

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log("Location state:", location.state); // Debug statement
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
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) {
            alert("Passwords do not match");
            return;
        }



        console.log("FormData to be sent:", formData);  // Debug statement

        axios.post('http://localhost:5000/admin/add_employee', formData, {
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
        <div className="AdmitPatientCont">
            <div className="container-fluid">
                <div className="row">
                    <div id="AdmitForm" className="col-10 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div id="profilePreview" className="col-3">
                                    <img id="profileImg" src={profileImg} alt="Preview"/>
                                    <input onChange={handleImgupload} type="file"/>
                                    <p id="imgSpecs">snsna<br/>laa<br/>ssads</p>
                                </div>
                                <div id="inputs" className="col-9">
                                    <p id="scndTitle">Add Staff</p>

                                    <UserText1 label="National ID" type="text" name="NID" value={formData.NID}
                                               onChange={handleInputChange}/>

                                    <div className="row">
                                        <div className="col-6">
                                            <UserText1 label="First name" type="text" name="firstName"
                                                       value={formData.firstName} onChange={handleInputChange}/>
                                        </div>
                                        <div className="col-6">
                                            <UserText1 label="Last name" type="text" name="lastName"
                                                       value={formData.lastName} onChange={handleInputChange}/>
                                        </div>
                                    </div>

                                    <UserText1 label="Date of birth" type="date" name="dob" value={formData.dob}
                                               onChange={handleInputChange}/>
                                    <OR formData={formData} name = 'gender'/>
                                    <UserText1 label="Address" type="text" name="address" value={formData.address}
                                               onChange={handleInputChange}/>
                                    <UserText1 label="Email" type="email" name="email" value={formData.email}
                                               onChange={handleInputChange}/>
                                    <UserText1 label="Phone" type="tel" name="phone" value={formData.phone}
                                               onChange={handleInputChange}/>

                                    <UserText1 label="Hiring Date" type="date" name="dateHired" value={formData.dateHired}
                                                                                onChange={handleInputChange}/>
                                    
                                    <UserText1 label="Username" type="text" name="username" value={formData.username} hidden={cameForEdit}
                                               onChange={handleInputChange}/>
<UserText1 label="Password" type="password" name="password" value= {formData.password} onChange={handleInputChange} hidden={cameForEdit}/>
<UserText1 label="Password Confirm" type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleInputChange} hidden={cameForEdit} />
<List label="Shift" options={["Day", "Night"]} name="shift" value={formData.shift}
                                               onChange={handleInputChange}/>

                                    <List label="Role" options={roles} name="role" value={formData.role}
                                               onChange={handleInputChange}/>




                                    <div className="row" id={"footer"}>
                                        <div className="col-3">
                                            <Btn label="Back"/>
                                        </div>
                                        <div className="col-3 offset-6" onClick={handleSubmit}>
                                            <Btn label="Next"/>
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

export default AddStaff;
