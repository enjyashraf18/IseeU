from flask import request, jsonify, Blueprint
from flask_cors import CORS
from database import cursor, database_session, execute_query

admin_view = Blueprint("admin_view", __name__, static_folder="static", template_folder="templates")
CORS(admin_view, resources={
    r"/*": {"origins": "http://localhost:3000"}})  # Allow CORS for the login blueprint (Cross-Origin Resource Sharing

@admin_view.route('/admin/nurses', methods=['POST'])
def admin_nurses():
    data = request.json
    print(data)
    NID = data.get('NID')

    cursor.execute("""
           SELECT *
           FROM employee
           WHERE nid = %s AND role = 'Nurse' :: ROLE
       """, (NID,))

    admin_nurse = cursor.fetchall()
    return jsonify({"admin_nurse": admin_nurse})


@admin_view.route('/admin/employee', methods=['POST'])
def admin_employees():
    data = request.json
    print(data)
    NID = data.get('NID')

    cursor.execute("""
           SELECT *
           FROM employee
           WHERE nid = %s 
       """, (NID,))

    admin_employee = cursor.fetchall()
    return jsonify({"admin_employee": admin_employee})

@admin_view.route('/check_patient', methods=['POST'])
def check_user():
        data = request.json
        NID = data.get('NID')

        cursor.execute("SELECT nid FROM patients WHERE nid = %s", (NID,))
        patient_exists = cursor.fetchone()

        if patient_exists: # patient exists in the db
            cursor.execute("""
                           SELECT *
                           FROM patients
                           WHERE nid = %s 
                       """, (NID,))

            patient_data = cursor.fetchall()
            return jsonify({"admin_employee": patient_data})
        else: # patient does not exist in the db
            return jsonify({"message": "User does not exist"}), 400

@admin_view.route('/admin/admitPatient', methods=['POST'])
def admit_patient():
    data = request.json
    print(data)
    updateFlag = data.get('updateFlag')
    NID = data.get('NID')
    FName = data.get('FName')
    LName = data.get('LName')
    Gender = data.get('Gender')
    Email = data.get('Email')
    PPic = data.get('PPic')
    BrithD = data.get('BrithD')
    Address = data.get('Address')
    InformedConsent = data.get('InformedConsent')
    Complaint = data.get('Complaint')
    DocNotes = data.get('DocNotes')
    APACHE = data.get('APACHE')
    GCS = data.get('GCS')
    AdmitDateTime = data.get('AdmitDateTime')
    bedID = data.get('bedID')
    MorningNurseID = data.get('MorningNurseID')
    EveningNurseID = data.get('EveningNurseID')
    AdmittingDoctorID = data.get('AdmittingDoctorID')
    ReferralDep = data.get('ReferralDep')

    if updateFlag:
        query_patient = """INSERT INTO patients (nid, fname, lname, gender, email, ppic, brithd, address)
                                               VALUES (%s, %s,%s, %s, %s, %s, %s, %s)
                                               """

        params_patient = (
            NID, FName, LName, Gender, Email, PPic, BrithD, Address)
        cursor.execute(query_patient, params_patient)

        query_encounter = """INSERT INTO encounters (InformedConsent, Complaint, docnotes, apache, gcs, admitdatetime, bedid,
         morningnurseid, eveningnurseid, admittingdoctorid, referraldep)
                                                       VALUES (%s, %s,%s, %s, %s, %s, %s, %s, %s, %s, %s)
                                                       """

        params_encounter = (
            InformedConsent, Complaint, DocNotes, APACHE, GCS, AdmitDateTime, bedID, MorningNurseID, EveningNurseID,
            AdmittingDoctorID, ReferralDep)
        cursor.execute(query_encounter, params_encounter)


"""
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
            """









@admin_view.route('/admin/admitPatient', methods=['POST'])
def add_employee():
    data = request.json
    print(data)
    NID = data.get('NID')




