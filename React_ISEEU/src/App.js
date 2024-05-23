import React from 'react';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { OR,MBut,DEL,Search,UserText1,UserText2,UserAge,CheckBox,OpenLi,EmerBtn,Btn,LiBTN,Table_patients } from './components';
import { useNavigate } from 'react-router-dom';
import LayoutComponent from "./pages"
const App = (props) => {
  const navigate = useNavigate();
  const handleButton1 = () => {
    // Navigate to the desired page
    navigate('/patient_table');
  };
  const handleButton2 = () => {
    // Navigate to the desired page
    navigate('/Doctor_View');
  };

  return (
    <LayoutComponent/>

  )
}

export default App




