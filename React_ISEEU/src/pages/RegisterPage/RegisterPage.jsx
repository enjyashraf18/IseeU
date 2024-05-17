import React from 'react';
import "./RegisterPage.css";
import { OR,MBut,DEL,Search,UserText1,UserText2,UserAge,CheckBox,OpenLi,EmerBtn,Btn,LiBTN } from '../../components';

const Register = () => {
    return (<div id ="container" >
        <img id={"logoPic"} src={""} alt={"Logo"}/>
        <p id={"title"}>New Admin</p>
        <div id={"regForm"} className={"col-7 mx-auto"}>
            <form>
                <p id={"secondTitle"}>Access Info</p>
                <UserText1 label = "National ID" type={"text"} />
                <UserText1 label = "username" type={"text"} />
                <UserText1 label = "pasword" type={"password"} />
                <UserText1 label = "password confirm" type={"password"} />
                <Btn label={"Next"}/>
            </form>
        </div>
    </div>)
}

export default Register




