import React, { useState, useEffect, useMemo } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdmitPatient.css";
import { OR, Btn, UserText1, List } from '../../components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { Button } from 'react-bootstrap';
const initialform = {
    fname: '',
    lname: '',
    brithd: '',
    address: '',
    email: '',
    phone: '',
    NID: '',
    gender:'',
    hightcm: '',
    weightkg:'',
    //Stay data
}
//  (    InformedConsent, Complaint, DocNotes, APACHE, GCS, AdmitDateTime, , MorningNurseID, EveningNurseID,
    // AdmittingDoctorID, ReferralDep)
   const encounter = {
    InformedConsent: '',
    Complaint: '',
    APACHE:'',
    GCS: '',
    bedID: '',
    MorningNurseID: '',
    EveningNurseID: '',
    AdmittingDoctorID:'',
    ReferralDep:'',
    bedtype:''

}
const AdmitPatient = () => {
        const bedIDs = ["1A", "3A"]; // should get all available beds
        const bedTypes =['Standard', 'CriticalCare', 'Bariatric', 'Air Fluidized', 'Pediatric'];

    const [profileImg, setProfileImg] = useState("https://placehold.co/500x320");

    const [patientData, setPatientData] = useState(initialform);
    const [encounterData, setencounterData] = useState(encounter);
    const [beds ,  setBeds] = useState(bedIDs)
    const [isPatientFound, setIsPatientFound] = useState(false); // New state for button status
    const NID = ''
    const refDepart = ["Aaaa", "Baaaa"]; // should get all available depart
    const doctorsNames = ["A", "B"]; // should get all available doctors
    const [doctors , setDoctors] = useState(doctorsNames)
    const doctorsdata = {};
    const [nursesdata, setNursesData] = useState([[doctorsNames],[doctorsNames]])
     // should get all available nurses

    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

   
  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchData = async () => {
        // Perform the axios GET request
        const avilableNurses = await axios.get('http://localhost:5000/admin/available_nurses', {
            headers: { 'Content-Type': 'application/json' }
          })
        console.log("nurses", avilableNurses.data)
        
        const avNurse = avilableNurses.data
        const extractIdsAndNames = (nurses) => {
            const retrunNurses =[]
            for(let i =0 ; i< nurses.length ; i ++){
                retrunNurses.push([`${nurses[i][0]} ${nurses[i][3]} ${nurses[i][4]}`])
            }
            return retrunNurses
          };

        const morningNurses = extractIdsAndNames(avNurse.morning_nurses);
        const eveningNurses = extractIdsAndNames(avNurse.evening_nurses);
        setNursesData([morningNurses,eveningNurses])
        console.log("nurses", morningNurses)

        const avilableDoctors = await axios.get('http://localhost:5000/admin/doctors', {
            headers: { 'Content-Type': 'application/json' }
          })
        console.log("nurses", avilableDoctors.dataall_doctors)
        
        const avDoc = avilableDoctors.data.all_doctors
  

        const doc = extractIdsAndNames(avDoc);
        setDoctors(doc)
        console.log("doctors", doc)



        // console.log(encountersData)  
        // setEncounters(encountersData)

      
      console.log("fetched ....")
      setLoading(false);

    }

    // Call the async function to fetch data
     fetchData();
    }, []);
    const handleInputPatientChange = (e) => {
        const { name, value } = e.target; 
        setPatientData({
            ...patientData,
            [name]: value
        });  
    if(name === 'NID'){

        console.log(`Input changed: ${patientData.NID} `);
        const body = {
            NID: patientData.NID
          };
          console.log(patientData.NID)
          axios.post('http://localhost:5000/check_patient', body, {
            headers: {      
              'Content-Type': 'application/json'
            }
          })
          .then(
            response => {
                if(response.data.message !== "User does not exist"){
                    const patient = response.data.admin_employee
                    console.log(patientData)

                    setPatientData(patient)
                    setIsPatientFound(true);
                    console.log("patient",patientData)

                }
            
            }
          )
          .catch(error => {
            console.log(error);
          });
          console.log(patientData)
    }

    };
    const handleInputEncounterChange = (e) => {
        const { name, value } = e.target; 
        setencounterData({
            ...encounterData,
            [name]: value
        }); 
        
        console.log(doctors)}
    }
        
   
 

   
    function handleImgupload(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProfileImg(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    

    const handleSubmit = (e) => {
      
        console.log("FormData to be sent:", patientData); // Debug statement
        const requestData = {
            updateFlag : !isPatientFound,
            patient :patientData,
            encounter:encounterData
        }
        axios.post('http://localhost:5000/admit_patient', requestData, {
            headers: {      
              'Content-Type': 'application/json'
            }
          })
        .then(response => {
                console.log(response.data);
                if (response.data.message === "Patient successfully Admitted") {
                    // Redirect to another route, e.g., /dashboard
                    // navigate('/',[formData);
                    console.log("yesss")
                } else {
                    // Handle login failure, show error message etc.
                    console.log('Patient unsuccessfully Admitted');
                }
                // setServerResponse(response.data.message);
                // setShow(true);
                })

            .catch(error => {
                console.error('Error during checking:', error);
                alert('addmiting failed failed: ' + error.message);
            });
    };

    const handleCheckClick = (patientData) => {
  
        const body = {
            NID: patientData.NID
          };
          console.log(patientData.NID)
          axios.post('http://localhost:5000/check_patient', body, {
            headers: {      
              'Content-Type': 'application/json'
            }
          })
          .then(
            response => {
                if(response.data.message !== "User does not exist"){
                    const patient = response.data.admin_employee

                    setPatientData({
                        ...patientData,
                        patient
                    });
                    setIsPatientFound(true);
                    console.log(patient)

                }
            
            }
          )
          .catch(error => {
            console.log(error);
          });
    };

    return (
        <div className="AdmitPatientCont">
            <div className="container-fluid">
                <div className="row">
                    <div id="AdmitForm" className="col-10 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div id="profilePreview" className="col-3">
                                    <img id="profileImg" src={profileImg} alt="Preview" />
                                    <input onChange={handleImgupload} type="file" />
                                    <p id="imgSpecs">snsna<br />sfasfsaa<br />ssads</p>
                                </div>
                                <div id="inputs" className="col-9">
                                    <p id="scndTitle">Personal Info</p>

                                    <div className="row">
                                        <div className="col-10 gx-1">
                                            <UserText1 label="National ID" type="text" name="NID" value={patientData.NID}
                                                       onChange={handleInputPatientChange}/>
                                        </div>

                                    </div>
                                    {isPatientFound ? (
  <span id="label">Patient found</span>
) : (
  <div>
    <div className="row">
      <div className="col-6">
        <UserText1 
          label="First name" 
          type="text" 
          name="firstName"
          value={patientData.fname} 
          onChange={handleInputPatientChange}
        />
      </div>
      <div className="col-6">
        <UserText1 
          label="Last name" 
          type="text" 
          name="lastName"
          value={patientData.lname} 
          onChange={handleInputPatientChange}
        />
      </div>
    </div>
    <div>
      <UserText1
        label="Date of birth"
        type="date"
        name="dob"
        value={patientData.dob}
        onChange={handleInputPatientChange}
      />
      <OR formData={patientData} onChange={setPatientData} />
    </div>
    <UserText1 
      label="Address" 
      type="text" 
      name="address" 
      value={patientData.address}
      onChange={handleInputPatientChange}
    />
    <UserText1 
      label="Email" 
      type="email" 
      name="email" 
      value={patientData.email}
      onChange={handleInputPatientChange}
    />
    <div className="row">
      <div className="col-6">
        <UserText1 
          label="Height cm" 
          type="number" 
          name="heightcm" 
          value={encounterData.heightcm}
          onChange={handleInputEncounterChange}
        />
      </div>
      <div className="col-6">
        <UserText1 
          label="Weight Kg" 
          type="number" 
          name="weightkg"
          value={encounterData.weightkg}
          onChange={handleInputEncounterChange}
        />
      </div>
    </div>
  </div>
)}
                                    <p id="stayTitle">Stay Details</p>

                                    <UserText1 label="Admitting Time" type="datetime-local" name="admittingTIme"
                                               value={encounterData.admitTime}
                                               onChange={handleInputEncounterChange}/>

                                    <List label="Referral Department" options={refDepart} name={"refDepart"}
                                          value={encounterData.refDepart}
                                          onChange={handleInputEncounterChange}/>
                                    <div className="row">
                                    <div className="col-6">
                                            <List label="Bed Type" options={bedTypes} name="bedtype" value={encounterData.complaint}
                                            onChange={handleInputEncounterChange}/>

                                    </div>
                                    <div className="col-6">
                                            <List label="Bed ID" options={beds} name="bedID" value={encounterData.bedID}
                                            onChange={handleInputEncounterChange}/>
                                    </div>
                                    </div>
                                    <List label="Admitting doctor" options={doctors} name="AdmittingDoctorID"
                                          value={encounterData.AdmittingDoctorID}
                                          onChange={handleInputEncounterChange}/>

                                    <div className="row">
                                        <div className="col-6">
                                            <List label="Morning nurse" options={nursesdata[0]} name="morningNurse"
                                                  value={encounterData.morningNurse}
                                                  onChange={handleInputEncounterChange}/>
                                        </div>
                                        <div className="col-6">
                                            <List label="Evening Nurse" options={nursesdata[1]} name="eveningNurse"
                                                  value={encounterData.eveningNurse}
                                                  onChange={handleInputEncounterChange}/>
                                        </div>
                                    </div>

                                    <UserText1 label="Complaint" type="text" name="complaint" value={encounterData.complaint}
                                               onChange={handleInputEncounterChange}/>


                                    <label id={"docNotesLabel"}>Doctor Notes</label>
                                    <textarea id={"docNotes"} value={encounterData.docNotes}>ksalnf</textarea>


                                    <div className="row">
                                        <div className="col-6">
                                            <UserText1 label="GCS" type="number" name="GCS" value={encounterData.GCS}
                                                       onChange={handleInputEncounterChange}/>
                                        </div>
                                        <div className="col-6">
                                            <UserText1 label="Apache" type="number" name="apache"
                                                       value={encounterData.apache}
                                                       onChange={handleInputEncounterChange}/>
                                        </div>
                                    </div>

                                    <label id={"consentLabel"}>Consent</label>
                                    <input onChange={handleImgupload} type="file"/>

                                    <div className="row">
                                        <div className="col-3">
                                            <Btn label="Back"/>
                                        </div>
                                        <div className="col-3 offset-6">
                                            <Btn label="Next"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdmitPatient;
