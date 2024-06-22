import React, { useEffect, useMemo, useState } from 'react';
import "./DoctorsAnalysis.css";
import styles from './DoctorsAnalysis.css';
import { Table_patients,Btn } from '../../components';
import axios from 'axios'


const DoctorsAnalysis = () => {

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
  const [doctors, setdoctors] = useState();
  const [loading, setLoading] = useState(true);

  const role="Admin";
  const label="Add";
  const flag=true;
  const columns=["ID","Name","Shift","Gender","Date Hired", "Still Working"]
  const handleDataChange = (newData) => {
    setdoctors(newData);
  };
  function getyearmonth(date) {
    const hireDate = new Date(date);
    const year = hireDate.getFullYear();
    const month =  hireDate.getMonth();
   
    return `${year} - ${month}`;
  }

  function isworking(date) {
    console.log(date)
    if(date === `null`)    return `Yes`;
    else return `No`
  }
  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchData = async () => {
        // Perform the axios GET request
        const responseDoctors = await axios.get('http://localhost:5000/admin/doctors', {
            headers: { 'Content-Type': 'application/json' }
          })
        console.log("doctors", responseDoctors.data.all_doctors)
        
        const rawdoc = responseDoctors.data.all_doctors
        const displayedDoc = rawdoc.map(encounter => [
          encounter[7], // Profile Picture of the patient
          encounter[0],
          `${encounter[3]} ${encounter[4]}`, // First name and last name
          encounter[14], // The status
          encounter[5], // Gender of the patient
           // Age
          getyearmonth(encounter[12],), // Days since encounter
          isworking(`${encounter[13]}`)
        ]);


        console.log(displayedDoc)  
        setdoctors(displayedDoc)

      
      console.log("fetched ....")
      setLoading(false);

    }

    // Call the async function to fetch data
     fetchData();
    }, []);

  if (loading) return <>loading</>;

  return (
  <div className='panalysis'>
    <div className="container-fluid ">
      <div className="row ">
        <div className="col-10 col-md-4 ">
          <div className="patientanalysis-table">
            <Table_patients data={doctors} anotherProp={role} headers={columns} flag={flag}  showSearch={true} onDataChange={handleDataChange} buttonpic={2}/>

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

export default DoctorsAnalysis;
