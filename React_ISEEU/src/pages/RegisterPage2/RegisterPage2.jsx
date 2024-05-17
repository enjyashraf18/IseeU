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
                                    <img src={""} alt={"Preview"}/>
                                    <input type = "file"/>
                                    <p>snsna<br/>sfasfsaa<br/>ssads</p>
                                </div>
                                <div id={"inputs"} className={"col-9"}>
                                    <p>Personal Info</p>
                                    <UserText1/>
                                    <OR></OR>
                                    <UserText1/>
                                    <UserText1/>
                                    <UserText1/>
                                    <UserText1/>
                                    <UserText1/>

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
