import React, { useState, useMemo,useEffect } from 'react';
import "./nurseProfile.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table_patients,Btn,Card } from '../../components';
import axios from 'axios'
const NurseProfile = () => {

    const nurseId = 'N001'// will get it from useContext

    const intialMedication=[["Devil Breath (500mg)","15A","Miguel O’Hara","Now","unchecked"],["Devil Breath (500mg)","15A","Miguel O’Hara","Now","unchecked"],
    ["Devil Breath (500mg)","15A","Miguel O’Hara","22:11 am","unchecked"],["Devil Breath (500mg)","15A","Miguel O’Hara","22:11 am","unchecked"]]
    const displayMedications=[]
    const meddata = {

    }
    const displayedPatients = []
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

  useMemo(
    ()=>{
        const fetchData = async () => {
            const body = {
                NId: nurseId
            }
            // Perform the axios GET request
            const [responseMed,responsePatients, responseDoctors] = await Promise.all([
                axios.post('http://localhost:5000/nurse/medications', body,{
                    headers: { 'Content-Type': 'application/json' }
                  }),                    
                axios.get('http://localhost:5000/nurse/patients', body, {
                    headers: { 'Content-Type': 'application/json' }
                }),
                axios.get('http://localhost:5000/doctor/current_employees', {
                    headers: { 'Content-Type': 'application/json' }
                })
            ]);

            const rawpatients = responsePatients.data
            const rawmed = responseMed.data

            for(let i=0;i<rawmed.length; i++ ){
                const key = rawmed[i].bedid
                meddata[key] = rawmed[i].medid;
                displayMedications.push(
                  [
                    concNameDose(rawmed[i].name, rawmed[i].dose),
                    rawmed[i].bedid,
                    concfullname(rawmed[i].fname, rawmed[i].lname),
                    calcNextDose(rawmed[i].lastdosetime, rawmed[i].fequencyperday)
                  ]
                )

            }

            for(let i=0;i<rawpatients.length; i++ ){
              displayedPatients.push([
                rawpatients[i].ppic, // Profile Picture of the patient
                `${rawpatients[i].fname} ${rawpatients[i].lname}`, // First name and last name
                rawpatients[i].bedid, // Bed No of the encounter
                rawpatients[i].status
              ])
            }

      

        //   setLoading(false);
    
      }
    
        // Call the async function to fetch data
        fetchData();

    }
)
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
