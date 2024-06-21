import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Info.css";
import { Btn, List, OR, UserText1 } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';

const Info = () => {
    const viewerRole = "patient"; // WHOSE PROFILE IS THIS


    const canEdit = false; // if Admin or the same user


    const [showArray, setShowArray] = useState({
        username: true,
        firstName: false,
        lastName: false,
        NID: false,
        dob: false,
        address: false,
        email: false,
        phone: false,
        gender: false,
        expYrs: false,
        role: false,
        height: false,
        weight: false,
    });

    const [profileImg, setProfileImg] = useState("https://placehold.co/500x320");
    const [formData, setFormData] = useState({
        username: 'TalalE',
        firstName: 'Talal',
        lastName: 'klnfasklfs',
        dob: '',
        address: 'knafsk',
        email: 'nafsklna',
        phone: '56656+5998',
        NID: '555-6898-564649',
        expYrs: '5',
        role: 'doctor',
        gender: "Male",
        height: "155",
        weight: "42",
    });
    const habits = ["smoker", "active"];

    const roles = ["Doctor", "Nurse"];
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const viewerSet = () => {
            if (viewerRole === "employee") {
                setShowArray({
                    username: true,
                    firstName: true,
                    lastName: true,
                    NID: true,
                    dob: true,
                    address: true,
                    email: true,
                    phone: true,
                    gender: true,
                    expYrs: true,
                    role: true,
                    height: false,
                    weight: false,
                    habits: false,
                });
            } else if (viewerRole === "patient") {
                setShowArray({
                    username: true,
                    firstName: true,
                    lastName: true,
                    NID: true,
                    dob: true,
                    address: false,
                    email: false,
                    phone: false,
                    gender: true,
                    expYrs: false,
                    role: false,
                    height: true,
                    weight: true,
                    habits: true,
                });
            }
        };

        viewerSet();
    }, [viewerRole]);

    useEffect(() => {
        if (location.state && location.state.NID) {
            setFormData((prevData) => ({
                ...prevData,
                NID: location.state.NID
            }));
        }
    }, [location.state]);

    return (
        <div className="InfoCont">
            <div className="container-fluid">
                <div className="row">
                    <div id="AdmitForm" className="col-8 mx-auto">
                        <form>
                            <div className="row">
                                <div id="profilePreview" className="col-3">
                                    <img id="profileImg" src={profileImg} alt="Preview" />
                                </div>
                                <div id="inputs" className="col-9">
                                    <p id="scndTitle">Profile</p>

                                    <UserText1 label="Username" type="text" name="username" value={formData.username}
                                               hidden={!showArray.username} disabled={true} />

                                    <div className="row">
                                        <div className="col-6">
                                            <UserText1 label="First name" type="text" name="firstName"
                                                       hidden={!showArray.firstName} disabled={true}
                                                       value={formData.firstName} />
                                        </div>
                                        <div className="col-6">
                                            <UserText1 label="Last name" type="text" name="lastName"
                                                       hidden={!showArray.lastName} disabled={true}
                                                       value={formData.lastName} />
                                        </div>
                                    </div>

                                    <UserText1 label="National ID" type="text" name="NID" value={formData.NID}
                                               hidden={!showArray.NID} disabled={true} />

                                    <UserText1 label="Gender" type="text" name="gender" value={formData.gender}
                                               hidden={!showArray.gender} disabled={true} />

                                    <UserText1 label="Date of birth" type="date" name="dob" value={formData.dob}
                                               hidden={!showArray.dob} disabled={true} />

                                    <UserText1 label="Address" type="text" name="address" value={formData.address}
                                               hidden={!showArray.address} disabled={true} />

                                    <UserText1 label="Email" type="email" name="email" value={formData.email}
                                               hidden={!showArray.email} disabled={true} />

                                    <UserText1 label="Phone" type="tel" name="phone" value={formData.phone}
                                               hidden={!showArray.phone} disabled={true} />

                                    <UserText1 label="Years of Experience" type="text" name="expYrs"
                                               value={formData.expYrs + " yrs"} hidden={!showArray.expYrs} disabled={true} />

                                    <UserText1 label="Role" name="role" value={formData.role}
                                               hidden={!showArray.role} disabled={true} />

                                    <UserText1 label="Height" name="height" value={formData.height + " cm"}
                                               hidden={!showArray.height} disabled={true} />

                                    <UserText1 label="Weight" name="weight" value={formData.weight + " KG"}
                                               hidden={!showArray.weight} disabled={true} />

                                    <div className={"habitsDiv"} hidden={!showArray.habits}>
                                        <p> Habits</p>
                                        <ul>
                                            {habits.map((item, index) => (
                                                <li className={"habits"} key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="row" id="footer">
                                        <div className="col-3">
                                            <Btn label="Back" />
                                        </div>
                                        {canEdit && (
                                            <div className="col-3 offset-6">
                                                <Btn label="Edit" />
                                            </div>
                                        )}
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

export default Info;
