import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterPage2.css";
import { OR, MBut, DEL, Search, UserText1, UserText2, UserAge, CheckBox, OpenLi, EmerBtn, Btn, LiBTN } from '../../components';

const Register2 = () => {
    return (<div id="container">
            <div className="container-fluid">
                <div className="row">
                    <div id={"regForm"} className={"col-10 mx-auto"}>
                        <form>
                            <div className={"row"}>
                                <div id={"profilePreview"} className={"col-3"}>
                                    <img src={"https://placehold.co/320x320"} alt={"Preview"}/>
                                    <input type = "file"/>
                                    <p>snsna<br/>sfasfsaa<br/>ssads</p>
                                    <Btn label = "Back" type={"submit"}/>

                                </div>
                                <div id={"inputs"} className={"col-9"}>
                                    <p>Personal Info</p>
                                    <div className={"row"}>
                                        <div className={"col-6"}><UserText1 label="First name" type={"text"}/></div>
                                        <div className={"col-6"}><UserText1 label="First name" type={"text"}/></div>
                                    </div>
                                    <UserText1 label="Date of birth" type={"date"}/>
                                    <OR/>
                                    <UserText1 label="Address" type={"text"}/>
                                    <UserText1 label="Email" type={"email"}/>
                                    <UserText1 label="Phone" type={"number"}/>

                                <Btn label = "Next" type={"submit"}/>
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
