import React from 'react';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { OR,MBut,DEL,Search,UserText1,UserText2,UserAge,CheckBox,OpenLi,EmerBtn,Btn,LiBTN,Table_patients } from './components';
import { useNavigate } from 'react-router-dom';
const App = (props) => {
  const navigate = useNavigate();
  const handleButton1 = () => {
    // Navigate to the desired page
    navigate('/patient_table');
  };

  return (
    <div className='App'>
    <button onClick={handleButton1} >go to patient page</button>
                                 
    
    </div>
  )
}

export default App




