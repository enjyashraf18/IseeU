import React from 'react';
import "./nurseProfile.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table_patients,Btn,Card } from '../../components';
import { useState } from 'react';
const NurseProfile = () => {
    const intialMedication=[["Devil Breath (500mg)","15A","Miguel O’Hara","Now","unchecked"],["Devil Breath (500mg)","15A","Miguel O’Hara","Now","unchecked"],
    ["Devil Breath (500mg)","15A","Miguel O’Hara","22:11 am","unchecked"],["Devil Breath (500mg)","15A","Miguel O’Hara","22:11 am","unchecked"]]
    const patient_nurse=[["Icons-Land-Medical-People-Patient-Female.ico","shahd","15A","Coma"],
    ["Icons-Land-Medical-People-Patient-Female.ico","Enjy","15A","Coma"],
    ["Icons-Land-Medical-People-Patient-Female.ico","shrouk","15A","Coma"],
    ["Icons-Land-Medical-People-Patient-Female.ico","meram","15A","Coma"],
    ["Icons-Land-Medical-People-Patient-Female.ico","nouran","15A","Coma"],
    ["Icons-Land-Medical-People-Patient-Female.ico","yasmeen","15A","Coma"]];
    const nurse_staff=[["Miguel", "O'Hara", "22", "Male"],["Miguel", "O'Hara", "22", "Male"],["Miguel", "O'Hara", "22", "Male"]]
    const [medication,setmedication]=useState(intialMedication);
   const medication_header=["","Medication","Bed No.","Patient","Time"];
   const patient_header=["Name","Bed_No","Statue"]
const role="user";
const handleMedicationChange = (newData) => { // here i change the data of the patient if checked or not " toggle first value"
    setmedication(newData);
  };
  return (
    <div className='nurseprofile container-fluid'>
        <div className='row'>
<div className='col-2'></div> {/**sidebar */}
<div className='col-1'></div>{/**space */}
<div className='col-8'>


<div className="medicication_nurse">
    <h5>Medication</h5>
<Table_patients 
         data={medication}
         headers={medication_header}
         flag={false}
         anotherProp={role}
         onDataChange={handleMedicationChange}
         ischecktable={true}
         showSearch={false}
         idx_checked ={4}
        />
        </div>
        <div className='flow_row_nurse'>
<div className='patient_nurse'>
    <h5>Patient</h5>
    <div className='Number'>
        <h12 >{patient_nurse.length}</h12>
        </div>
<Table_patients 
         data={patient_nurse}
         headers={patient_header}
         flag={true}
         anotherProp={role}
      
         ischecktable={false}
         showSearch={false}
     
        />
        </div>
        <div className='nurse_staff'>
        <Card data={["Miguel", "O'Hara", "22", "Male"]}/>
                    <Card data={["Miguel", "O'Hara", "22", "Male"]}/>
                    <Card data={["Miguel", "O'Hara", "22", "Male"]}/>
                    <Card data={["Miguel", "O'Hara", "22", "Male"]}/>
                    <Card data={["Miguel", "O'Hara", "22", "Male"]}/>
                    <Card data={["Miguel", "O'Hara", "22", "Male"]}/>

        </div>

</div>
        </div> 
    </div>{/**end row */}
    </div>
  )
}

export default NurseProfile
