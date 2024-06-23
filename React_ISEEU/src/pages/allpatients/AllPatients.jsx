import React, { useEffect, useMemo, useState } from 'react';
import "./AllPatients.css";
import styles from './AllPatients.css';
import { Table_patients,Btn } from '../../components';
import axios from 'axios'


const AllPatients = () => {

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
  const [allpatients, setAllPatients] = useState(initialPatientData);  
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  const role=user.role;
  const label="Add";
  const flag=true;
  const columns=["ID","Name","Gender","Email","Age","Adress"]
  const handleDataChange = (newData) => {
    setAllPatients(newData);
  };

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
        const responseAllPatients = await axios.get('http://localhost:5000/admin/patients', {
            headers: { 'Content-Type': 'application/json' }
          })
        console.log("encounters", responseAllPatients.data.patients)
        
        const rawAllPatients = responseAllPatients.data.patients
        const patientsData = rawAllPatients.map(encounter => [
          // Profile Picture of the patient
          encounter[0], 
          `${encounter[1]} ${encounter[2]}`, // First name and last name
          encounter[3], // Bed No of the encounter
          encounter[4], // The status
          calculateAge(encounter[6]), // Age
          encounter[7], // Days since encounter
        ]);


        console.log(patientsData)  
        setAllPatients(patientsData)

      
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
            <Table_patients data={allpatients} anotherProp={role} headers={columns} flag={false}  showSearch={true} onDataChange={handleDataChange} />

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

export default AllPatients;
