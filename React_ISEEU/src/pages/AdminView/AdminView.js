import React, { useEffect, useState } from 'react';
import "./AdminView.css";
import {Card, Chart} from '../../components'; // Adjust import statement based on actual component paths
import axios from 'axios'

const AdminView = () => {
    const [bedsData, setBedsData ]= useState([55, 22]); // Assuming 55 beds available, 22 taken
    const [patientsNumber, setPatientsNum] = useState(55);
    const [staff , setStaff] = useState([], [])

    useEffect(() => {
        const fetchData = async () => {
            const [responseEncounters, responseStaff] = await Promise.all([
                axios.get('http://localhost:5000/doctor/current_encounters', {
                    headers: { 'Content-Type': 'application/json' }
                }),
                axios.get('http://localhost:5000/doctor/current_employees', {
                    headers: { 'Content-Type': 'application/json' }
                })
            ]);
            const encounters = responseEncounters.data.active_encounters
            setPatientsNum(encounters.length)
            setBedsData([20, encounters.length])
            const employeeData = responseStaff.data['active_employees']
            const employeesData = employeeData.map(employee => [
                employee[8], // ProfilePic
                `${employee[4]} ${employee[5]}`, // FullName
                employee[15], // Shift
                employee[12]  // Role
            ]);

            const employeesAvailable = [];
            const employeesUnavailable = [];
            for (let i = 0; i < employeesData.length; i++) {
                if (employeesData[i][2] === currentShift()) {
                    employeesAvailable.push(employeesData[i]);
                } else {
                    employeesUnavailable.push(employeesData[i]);
                }

            }

            setStaff([employeesUnavailable, employeesAvailable]);

        }

    },[])
    //should return number not 55 in span in doctors title

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
                    <p id={"doctorsPanelTitle"}> Staff <span id={"doctorsNo"}>55</span> </p>
                    <div id={"doctorCards"}>
                        <Card data={["Miguel", "O'Hara", "22", "Doctor"]}/>
                        <Card data={["Miguel", "O'Hara", "22", "Nurse"]}/>
                        <Card data={["Miguel", "O'Hara", "22", "Nurse"]}/>
                        <Card data={["Miguel", "O'Hara", "22", "Doctor"]}/>
                        <Card data={["Miguel", "O'Hara", "22", "Nurse"]}/>

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