import React, { useEffect, useMemo, useState } from 'react';
import "./Investigations.css";
import styles from './Investigations.css';
import { Table_patients,Btn } from '../../components';
import axios from 'axios'


const Investigations = () => {

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
  const [Investigations, setInvestigations] = useState(initialPatientData);  
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const userID =  user.NID
  const role=user.role;
  const label="Add";
  const flag=false;
  const columns=["Name","Encounter","Result","Odered By","Notes"]
  const handleDataChange = (newData) => {
    setInvestigations(newData);
  };


  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchData = async () => {
        // Perform the axios GET request
        const body = {DID : userID}
        const responseInvestigations = await axios.post('http://localhost:5000/doctor/doctor_investigations', body,{
            headers: { 'Content-Type': 'application/json' }
          })
        console.log("investigations", responseInvestigations.data.doctor_investigations)
        
        const rawInv = responseInvestigations.data.active_encounters
        const displayedInv = rawInv.map(encounter => [
          encounter[24], // Profile Picture of the patient
          `${encounter[20]} ${encounter[21]}`, // First name and last name
          encounter[9], // Bed No of the encounter
          encounter[3], // The status
          encounter[22], // Gender of the patient
        ]);


        console.log(displayedInv)  
        setInvestigations(displayedInv)

      
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
        <div className="col-10 col-md-4 ">
          <div className="patientanalysis-table">
            <Table_patients data={Investigations} anotherProp={role} headers={columns} flag={flag}  showSearch={true} onDataChange={handleDataChange} buttonpic={2}/>

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
    </div>
    </div>
  );
}

export default Investigations;
