import React, { useEffect, useState } from 'react';
import "./AdminView.css";
import {Card, Chart,ProSide} from '../../components'; // Adjust import statement based on actual component paths
import axios from 'axios'

const AdminView = () => {
    const [bedsData, setBedsData ]= useState([20, 15]); // Assuming 55 beds available, 22 taken
    const [patientsNumber, setPatientsNum] = useState(20);
    const [staff , setStaff] = useState([], [])
    const [loading, setLoading] = useState(true);

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
        const fetchData = async () => {
            // const [responseEncounters, responseStaff] = await Promise.all([
            //     axios.get('http://localhost:5000/doctor/current_encounters', {
            //         headers: { 'Content-Type': 'application/json' }
            //     }),
            //     axios.get('http://localhost:5000/doctor/current_employees', {
            //         headers: { 'Content-Type': 'application/json' }
            //     })
            // ]);
            const responseEncounters = await axios.get('http://localhost:5000/doctor/current_encounters', {
              headers: { 'Content-Type': 'application/json' }
            });
    
            const encounters = responseEncounters.data.active_encounters
            console.log(encounters)
            setPatientsNum(encounters.length)
            setBedsData([20, encounters.length])
            console.log(patientsNumber)
            console.log(bedsData)
    
            const responseStaff = await axios.get('http://localhost:5000/doctor/current_employees', {
              headers: { 'Content-Type': 'application/json' }
            });
    
    
            const employeeData = responseStaff.data.active_employees
            const employeesData = employeeData.map(employee => [
                // employee[7], // ProfilePic
                `${employee[3]} ${employee[4]}`, // FullName
                employee[14], // Shift
                employee[11],  // Role
                calculateAge(employee[8])
            ]);
            setStaff(employeesData)
            console.log(employeesData)
            setLoading(false)
              
        }
        fetchData()
    
    },[])
    //should return number not 55 in span in doctors title
    if (loading) return <p>Loading...</p>;

    return (
        
        <div id="adminCont" className="container-fluid">

            <div className="AdminView"></div>
            <div id="AdminView" className="row col-9 offset-3 g-5">
                <div id="AdminViewLeft" className="col-6">
                    <div id="bedCap" className="row">
                        <div className="col-6">
                            <p className="bedCapP" id="bedCapTitle">Beds Capacity</p>
                            <p className="bedCapP" id="bedCapAvailable">{bedsData[0]} Available</p>
                            <p className="bedCapP" id="bedCapTaken">{bedsData[1]} Taken</p>
                        </div>
                        <div id="chartDiv" className="col-6">
                            <Chart
                                id="bedCapChart"
                                type={"doughnut"}
                                data={bedsData}
                                labels={["Available", "Taken"]}
                                options={{
                                    maintainAspectRatio: false,
                                    responsive: true
                                }}/>
                        </div>
                    </div>
                </div>

                <div id="AdminViewRight" className="col-6">
                    <div id="patientNo" className="row">
                        <div id="patientStats" className="col-6">
                            <p id="patientNumber"> {patientsNumber} </p>
                            <p id="patientTitle">Patients</p>
                        </div>
                        <div id="admit_Discharge" className="col-6">
                            <div id="admit" className="row">
                                <button id="admitButton">Admit</button>
                            </div>
                            <div id="discharge" className="row">
                                <button id="dischargeButton">Discharge</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="doctorsPanel">
                    <p id={"doctorsPanelTitle"}> Staff <span id={"doctorsNo"}>{staff.length}</span> </p>
                    <div id={"doctorCards"}>
                    {staff.map((data, index) => (
                    <Card key={index} data={data} />
                     ))}

                        {
                            //Stay in end !!!!DONT TOUCH
                        }

                        <Card typeAdd={true} onClick={()=>{console.log("I have been clicked")}}/>
                    </div>
                </div>

                <div id="statsPanel">
                    <p id={"doctorsPanelTitle"}>Patients Analysis</p>
                    <Chart
                        id="bedCapChart"
                        type={"bar"}
                        data={[10,2,55,3]}
                        labels={["Available", "Taken","A","B"]}
                        options={{
                            maintainAspectRatio: false,
                            responsive: true
                        }}/>
                </div>
            </div>


        </div>
    );
};

export default AdminView;