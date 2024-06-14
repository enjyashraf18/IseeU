import React from 'react';
import "./AdminView.css";
import {Card, Chart} from '../../components'; // Adjust import statement based on actual component paths

const AdminView = () => {
    const bedsData = [55, 22]; // Assuming 55 beds available, 22 taken
    const patientsNumber = 55;

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
                                data={bedsData}
                                labels={["Available", "Taken"]}
                                options={{
                                    maintainAspectRatio: false,
                                    responsive: true
                                }}
                            />
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
                <p id={"doctorsPanelTitle"}> Doctors <span id={"doctorsNo"}>55</span> </p>
                <div id={"doctorCards"}>
                    <Card data={["Miguel", "O'Hara", "22", "Male"]}/>
                    <Card data={["Miguel", "O'Hara", "22", "Male"]}/>
                    <Card data={["Miguel", "O'Hara", "22", "Male"]}/>
                    <Card data={["Miguel", "O'Hara", "22", "Male"]}/>
                    <Card data={["Miguel", "O'Hara", "22", "Male"]}/>
                    <Card data={["Miguel", "O'Hara", "22", "Male"]}/>
                </div>
                </div>

                <div id="statsPanel">
                </div>
            </div>


        </div>
    );
};

export default AdminView;
