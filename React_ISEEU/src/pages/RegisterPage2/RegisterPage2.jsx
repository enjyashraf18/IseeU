import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterPage2.css";
import { OR, MBut, DEL, Search, UserText1, UserText2, UserAge, CheckBox, OpenLi, EmerBtn, Btn, LiBTN } from '../../components';

const Register2 = () => {

    const [profileImg,  setProfileImg] = useState("https://placehold.co/320x320")
    function  handleImgupload(e){
        setProfileImg(e.target.value);
        console.log(profileImg);
    }


    return (<div id="container">
            <div className="container-fluid">
                <div className="row">
                    <div id={"regForm"} className={"col-10 mx-auto"}>
                        <form>
                            <div className={"row"}>
                                <div id={"profilePreview"} className={"col-3"}>
                                    <img src={profileImg} alt={"Preview"}/>
                                    <input onChange={handleImgupload} type = "file"/>
                                    <p id={"imgSpecs"}>snsna<br/>sfasfsaa<br/>ssads</p>
                                </div>
                                <div id={"inputs"} className={"col-9"}>
                                    <p id={"scndTitle"}>Personal Info</p>
                                    <div className={"row"}>
                                        <div className={"col-6"}><UserText1 label="First name" type={"text"}/></div>
                                        <div className={"col-6"}><UserText1 label="First name" type={"text"}/></div>
                                    </div>
                                    <UserText1 label="Date of birth" type={"date"}/>
                                    <OR/>
                                    <UserText1 label="Address" type={"text"}/>
                                    <UserText1 label="Email" type={"email"}/>
                                    <UserText1 label="Phone" type={"number"}/>


                            <div className={"row"}>
                                <div className={"col-1"}><Btn label="Back" type={"submit"}/></div>
                                <div className={"col-1 offset-8"}> <Btn id = "nxtBtn" label = "Next" type={"submit"}/> </div>
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
