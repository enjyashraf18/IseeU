import React, { useState, useEffect, useMemo } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdmitPatient.css";
import { OR, Btn, UserText1, List } from '../../components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios'

const AdmitPatient = () => {
    const [profileImg, setProfileImg] = useState("https://placehold.co/500x320");

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        email: '',
        phone: '',
        NID: '',
        gender:'',
        //Stay data
        admitTime: '',
        refDepart: '',
        bedType:'',
        bedID: '',
        admitDoc: '',
        morningNurse: '',
        eveningNurse: '',

        complaint:'',
        apache:'',
        GCS:'',
        docNotes:'',
    });
    const [isPatientFound, setIsPatientFound] = useState(false); // New state for button status

    const refDepart = ["Aaaa", "Baaaa"]; // should get all available depart
    const doctorsNames = ["A", "B"]; // should get all available doctors
    const doctorsdata = {};
    const nursesdata = {};
    const nursesNames = {
        morningNurses:[],
        nightNurses: []
    }
     // should get all available nurses
    const bedIDs = ["1A", "3A"]; // should get all available beds

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log("Location state:", location.state); // Debug statement
        if (location.state && location.state.NID) {
            setFormData((prevData) => ({
                ...prevData,
                NID: location.state.NID
            }));
        }
    }, [location.state]); // Set NID from location state
    useMemo(
        ()=>{
            const fetchData = async () => {
                const body = {
                    bedtype: formData.bedType
                }
                // Perform the axios GET request
                const [responsebeds,responseNurses, responseDoctors] = await Promise.all([
                    axios.post('http://localhost:5000/doctor/avilable_beds', body,{
                        headers: { 'Content-Type': 'application/json' }
                      }),                    
                    axios.get('http://localhost:5000/doctor/current_encounters', {
                        headers: { 'Content-Type': 'application/json' }
                    }),
                    axios.get('http://localhost:5000/doctor/current_employees', {
                        headers: { 'Content-Type': 'application/json' }
                    })
                ]);

                const allnurses = responseNurses.data
                const doctors = responseDoctors.data
                const beds = responsebeds

                for(let i=0;i<allnurses.length; i++ ){
                    const key = `${allnurses[i].firstName} ${allnurses[i].lastName}`;

                    if(allnurses[i].shift === "morning"){
                        nursesNames.morningNurses.push(key)
                    }
                    if(allnurses[i].shift === "night"){
                        nursesNames.nightNurses.push(key)
                    }
                    nursesdata[key] = allnurses[i].id;

                }

                for(let i=0;i<doctors.length; i++ ){
                    const key = `${doctors[i].firstName} ${doctors[i].lastName}`;

                    doctorsNames.push(key)
                    doctorsdata[key] = doctors[i].id;
                }

                for(let i=0;i<beds.length; i++ ){
                    bedIDs.push(beds[i].id)
                }        

            //   setLoading(false);
        
          }
        
            // Call the async function to fetch data
            fetchData();

        }
    )
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    

    const handleSubmit = (e) => {

        console.log("FormData to be sent:", formData); // Debug statement
        const requestData = {
            updateFlag : !isPatientFound,
            patient : {
                NID :formData.NID ,
                FName:  formData.firstName ,
                LName: formData.lastName,
                Gender: formData.gender,
                Email:formData.email,
                PPic: profileImg ,
                BrithD:formData.dob,
                Address: formData.address
            },
            encounter:{
                InformedConsent: '',
                Complaint:formData.complaint,
                DocNotes: formData.docNotes,
                APACHE:formData.apache, 
                GCS: formData.GCS, 
                AdmitDateTime: formData.admitTime,
                bedID:formData.bedID,
                MorningNurseID:nursesdata[formData.morningNurse] ,
                EveningNurseID: nursesdata[formData.eveningNurse],
                AdmittingDoctorID:doctorsdata[formData.admitDoc],
                ReferralDep: formData.refDepart
            }
        }
        axios.post('http://localhost:5000/admit_patient', requestData, {
            headers: {      
              'Content-Type': 'application/json'
            }
          })
        .then(response => {
                console.log(response.data);
                if (response.data.message === "admitted successfully") {
                    // Redirect to another route, e.g., /dashboard
                    navigate('/',formData);
                } else {
                    // Handle login failure, show error message etc.
                    console.log('admitting failed');
                }
                // setServerResponse(response.data.message);
                // setShow(true);
                })

            .catch(error => {
                console.error('Error during checking:', error);
                alert('addmiting failed failed: ' + error.message);
            });
    };

    const handleCheckClick = (formData) => {

        const body = {
            NID: formData.NID
          };
      
          axios.post('http://localhost:5000/check_patient', body, {
            headers: {      
              'Content-Type': 'application/json'
            }
          })
          .then(
            response => {
                if(response.data.message === "Valid User"){
                    const patient = response.data.patient

                    setFormData({
                        ...formData,
                        patient
                    });
                    setIsPatientFound(true);

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
                                            <UserText1 label="National ID" type="text" name="NID" value={formData.NID}
                                                       onChange={handleInputChange}/>
                                        </div>
                                        <div className="col-2">
                                            {isPatientFound ? (
                                                <span id="label">Patient found</span>
                                            ) : (
                                                <Btn id="checkBtn" label="Check" onClick={handleCheckClick}/>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-6">
                                            <UserText1 label="First name" type="text" name="firstName"
                                                       value={formData.firstName} onChange={handleInputChange}/>
                                        </div>
                                        <div className="col-6">
                                            <UserText1 label="Last name" type="text" name="lastName"
                                                       value={formData.lastName} onChange={handleInputChange}/>
                                        </div>
                                    </div>

                                    <UserText1 label="Date of birth" type="date" name="dob" value={formData.dob}
                                               onChange={handleInputChange}/>
                                    <OR/>
                                    
                                    <UserText1 label="Address" type="text" name="address" value={formData.address}
                                               onChange={handleInputChange}/>
                                    <UserText1 label="Email" type="email" name="email" value={formData.email}
                                               onChange={handleInputChange}/>
                                    <UserText1 label="Phone" type="tel" name="phone" value={formData.phone}
                                               onChange={handleInputChange}/>
                                              

                                    <p id="stayTitle">Stay Details</p>

                                    <UserText1 label="Admitting Time" type="datetime-local" name="admittingTIme"
                                               value={formData.admitTime}
                                               onChange={handleInputChange}/>

                                    <List label="Referral Department" options={refDepart} name={"refDepart"}
                                          value={formData.refDepart}
                                          onChange={handleInputChange}/>
                                    <div className="row">
                                    <div className="col-6">
                                            <UserText1 label="Bed Type" type="text" name="bedtype" value={formData.complaint}
                                            onChange={handleInputChange}/>

                                    </div>
                                    <div className="col-6">
                                            <List label="Bed ID" options={bedIDs} name="bedID" value={formData.bedID}
                                            onChange={handleInputChange}/>
                                    </div>
                                    </div>
                                    <List label="Admitting doctor" options={doctorsNames} name="admitDoc"
                                          value={formData.admitDoc}
                                          onChange={handleInputChange}/>

                                    <div className="row">
                                        <div className="col-6">
                                            <List label="Morning nurse" options={nursesNames.morningNurses} name="morningNurse"
                                                  value={formData.morningNurse}
                                                  onChange={handleInputChange}/>
                                        </div>
                                        <div className="col-6">
                                            <List label="Evening Nurse" options={nursesNames.nightNurses} name="eveningNurse"
                                                  value={formData.eveningNurse}
                                                  onChange={handleInputChange}/>
                                        </div>
                                    </div>

                                    <UserText1 label="Complaint" type="text" name="complaint" value={formData.complaint}
                                               onChange={handleInputChange}/>


                                    <label id={"docNotesLabel"}>Doctor Notes</label>
                                    <textarea id={"docNotes"} value={formData.docNotes}>ksalnf</textarea>


                                    <div className="row">
                                        <div className="col-6">
                                            <UserText1 label="GCS" type="number" name="GCS" value={formData.GCS}
                                                       onChange={handleInputChange}/>
                                        </div>
                                        <div className="col-6">
                                            <UserText1 label="Apache" type="number" name="apache"
                                                       value={formData.apache}
                                                       onChange={handleInputChange}/>
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
