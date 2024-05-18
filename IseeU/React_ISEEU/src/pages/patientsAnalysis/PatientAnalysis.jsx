import React, { useState } from 'react';
import "./patientAnalysis.css";
import styles from './patientAnalysis.css';
import { Table_patients,Btn,Form } from '../../components';
const PatientAnalysis = () => {
  const patient_Analysis_data = [
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'Miguel O’Hara', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },
    { Name: 'shahd ahmed', Bed_NO: "15A", Status: "Coma", Gender: "Male", Age: 15, Admitted: "5 days" },



  ];
  
 let role="Admin";
 let label="Add";
 const dataForm = ["Name", "Bed_No", "Status", "Gender", "Age", "Admitted"]; 
  return (
  
    <div className="patientanalysis">
      <Table_patients data={patient_Analysis_data} anotherProp={role}  />
    {role==="Admin"?(<div className='addbtn'><Btn data={label}/> </div>):(null)}
    {/*<Btn/>*/}
    <Form data={dataForm}/>
    </div>
  );
}

export default PatientAnalysis;
