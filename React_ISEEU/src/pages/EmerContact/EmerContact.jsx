import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./EmerContact.css";
import { Btn, UserText1 } from '../../components';
import { useNavigate, useLocation } from 'react-router-dom';
import ContactComp from "./ContactComp/ContactComp";

const EmerContact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        relation: ''
    });
    const [contacts, setContacts] = useState([formData]);

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

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const newContacts = [...contacts];
        newContacts[index][name] = value;
        setContacts(newContacts);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) {
            alert("Passwords do not match");
            return;
        }
        console.log("FormData to be sent:", formData); // Debug statement

        fetch('/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formData, contacts })
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

    const addContact = () => {
        setContacts([...contacts, {
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            relation: ''
        }]);
    };

    const removeContact = (index) => {
        const newContacts = [...contacts];
        newContacts.splice(index, 1);
        setContacts(newContacts);
    };

    return (
        <div className="AdmitPatientCont">
            <div className="container-fluid">
                <div className="row">
                    <div id="AdmitForm" className="col-10 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div id="inputs" className="col-12">
                                    {contacts.map((contact, index) => (
                                        <div key={index}>
                                            <ContactComp
                                                value={contact}
                                                onChange={(e) => handleInputChange(e, index)}
                                            />
                                            <button
                                                type="button"
                                                className="removeBtn"
                                                onClick={() => removeContact(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" className="AddBtn" onClick={addContact}>
                                        Add Contact
                                    </button>
                                    <div className="row">
                                        <div className="col-3">
                                            <Btn label="Back"/>
                                        </div>
                                        <div className="col-3 offset-6">
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

export default EmerContact;
