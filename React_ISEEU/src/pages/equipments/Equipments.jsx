import React, { useEffect, useMemo, useState } from 'react';
import "./Equipments.css";
import styles from './Equipments.css';
import { Table_patients,Btn , ProSide} from '../../components';
import axios from 'axios'


const Equipments = () => {

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
  const [equips, setEquips] = useState(initialPatientData);  
  const [loading, setLoading] = useState(true);
   const user = JSON.parse(localStorage.getItem('user'));
  const role = 'Admin'
  const label="Add";
  const flag=false;
  const columns=["ID","Type","Statue","Bed ID"]
  const handleDataChange = (newData) => {
  setEquips(newData);
  };

  function isAvilable(statues){
    if (statues === true ) {
      return 'Working'
    }
    else {return 'Not Working'}
  }
  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchData = async () => {
        // Perform the axios GET request
        const responseEquip = await axios.get('http://localhost:5000//admin/equipment', {
            headers: { 'Content-Type': 'application/json' }
          })
        console.log("encounters", responseEquip.data.equipment)
        
        const rawEquips = responseEquip.data.equipment
        const allEquips = rawEquips.map(encounter => [
          encounter[0], // Profile Picture of the patient
          `${encounter[1]}`, // First name and last name
          isAvilable(encounter[2]), // Bed No of the encounter
          encounter[3], // The status
          
        ]);


        console.log(allEquips)  
        setEquips(allEquips)

      
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
            <Table_patients data={equips} anotherProp={role} headers={columns} flag={flag}  showSearch={true} onDataChange={handleDataChange} buttonpic={2}/>

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

export default Equipments;
