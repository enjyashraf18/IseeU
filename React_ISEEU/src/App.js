import React from 'react';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { OR,MBut,DEL,Search,UserText1,UserText2,UserAge,CheckBox,OpenLi,EmerBtn,Btn,LiBTN,Table_patients } from './components';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {QueryClient, QueryClientProvider} from "react-query"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Login,PatientProfile,Patient_Analysis,Doctor_View,Report, adm} from "./pages"
import { ProSide } from './components';
import '@fortawesome/fontawesome-free/css/all.min.css';

const queryClient = new QueryClient();

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

  const handleButton3 = () => {
    // Navigate to the desired page
    navigate('/Add_Report');
  };
  const handleButton4 = () => {
    // Navigate to the desired page
    navigate('/PatientProfile');
  };
  const handleButton5 = () => {
    // Navigate to the desired page
    navigate('/NurseProfile');
  };
  const handleButton6 = () => {
    // Navigate to the desired page
    navigate('/admin');
  };
  const handleButton7 = () => {
    // Navigate to the desired page
    navigate('/admitpatient');
  };
  return (
    <div className='App'>
      <Row>
     
      <ProSide/>

      <Col>

    <button onClick={handleButton1} >go to patient analysis page</button>
    <button onClick={handleButton2} >go to Doctor View page</button>
    <button onClick={handleButton3} >go to ADD report page</button>
    <button onClick={handleButton4} >go to  PatientProfile </button>
    <button onClick={handleButton5} >go to  NurseProfile </button>
    <button onClick={handleButton6} >go to  admin </button>
    <button onClick={handleButton7} >go to  admitpatient </button>
    </Col>
    </Row>
     <QueryClientProvider client= {queryClient}>
  
    </QueryClientProvider>                            
    
    </div>
  )

}

export default App




