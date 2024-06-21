import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactComp.css";
import {UserText1} from "../../../components";

const ContactComp = (props) => {
    return (
        <>
            <p id="scndTitle">Emergency Contacts</p>
            <div className="row">
                <div className="col-6">
                    <UserText1
                        label="First name"
                        type="text"
                        name="firstName"
                        value={props.value.firstName}
                        onChange={props.onChange}
                    />
                </div>
                <div className="col-6">
                    <UserText1
                        label="Last name"
                        type="text"
                        name="lastName"
                        value={props.value.lastName}
                        onChange={props.onChange}
                    />
                </div>
            </div>
            <UserText1
                label="Relation"
                type="text"
                name="relation"
                value={props.value.relation}
                onChange={props.onChange}
            />
            <UserText1
                label="Phone"
                type="tel"
                name="phone"
                value={props.value.phone}
                onChange={props.onChange}
            />
            <UserText1
                label="Address"
                type="text"
                name="address"
                value={props.value.address}
                onChange={props.onChange}
            />
        </>
    );
}

export default ContactComp;
