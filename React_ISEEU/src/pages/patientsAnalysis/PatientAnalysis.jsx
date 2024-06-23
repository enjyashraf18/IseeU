import React, { useEffect, useMemo, useState } from 'react';
import "./patientAnalysis.css";
import styles from './patientAnalysis.css';
import { Table_patients,Btn,ProSide } from '../../components';
import axios from 'axios'
import { height } from '@fortawesome/free-solid-svg-icons/fa0';


const PatientAnalysis = () => {

  const initialPatientData = [
    ["Icons-Land-Medical-People-Patient-Female.ico","shahd","15A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","Enjy","16A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","shrouk","17A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","meram","18A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","nouran","19A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","yasmeen","20A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","bassant","21A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","youmna","22A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","alaa","23A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","noor","24A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","rahma","25A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","awrad","26A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","mariem","27A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","reem","28A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","aya","29A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","mena","30A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","fatma","31A","Coma","Female",20,"5 days ago "],
    ["Icons-Land-Medical-People-Patient-Female.ico","zeina","32A","Coma","Female",20,"5 days ago "],

  ];
  const [patientAnalysisData, setPatientAnalysisData] = useState(initialPatientData);  
  const [encounters, setEncounters] = useState(patientAnalysisData);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
 const role='Doctor';
  const label="Add";
  const flag=true;
  const columns=["Name","Bed_No","Statue","Gender","Age","Admitted"]
  const handleDataChange = (newData) => {
  setPatientAnalysisData(newData);
  };
  function calculateDays(date) {
    const thedate = new Date(date);
    const today = new Date();
    const timeDifference = today - thedate;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return days;
  }
  function calculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchData = async () => {
        // Perform the axios GET request
        const responseEncounter = await axios.get('http://localhost:5000/doctor/current_encounters', {
            headers: { 'Content-Type': 'application/json' }
          })
        console.log("encounters", responseEncounter.data.active_encounters)
        
        const encounters = responseEncounter.data.active_encounters
        const encountersData = encounters.map(encounter => [
          encounter[24], // Profile Picture of the patient
          `${encounter[20]} ${encounter[21]}`, // First name and last name
          encounter[9], // Bed No of the encounter
          encounter[3], // The status
          encounter[22], // Gender of the patient
          calculateAge(encounter[25]), // Age
          calculateDays(encounter[7]), // Days since encounter
        ]);


        console.log(encountersData)  
        setEncounters(encountersData)

      
      console.log("fetched ....")
      setLoading(false);

    }

    // Call the async function to fetch data
     fetchData();
    }, []);

    // if (loading) return <p>Loading...</p>;

  return (
  <div className='panalysis'>
    <div className="container-fluid ">
      <div className="row ">
      <div id={"SideBarAdmin"} className={"col-2"}>
                    <ProSide />
                </div>
        <div className="col-10 col-md-4 ">
          <div className="patientanalysis-table">
            <Table_patients data={encounters} anotherProp={role} headers={columns} flag={flag}  showSearch={true} onDataChange={handleDataChange} buttonpic={2}/>

          </div>
        </div>
        {role === "Admin" && (
          <div className="col-10 text-end">
            <div className="addbtn">
              <Btn label={label} />
        
            </div>
          </div>
        )}
      
      </div>
      <div className='row' style={{height:"400px"}}></div> 
    </div>

    </div>
  );
}

export default PatientAnalysis;
