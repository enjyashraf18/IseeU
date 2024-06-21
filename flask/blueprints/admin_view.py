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
def check_patient():
        data = request.json
        print(data)
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
    patient = data.get('patient')
    encounter = data.get('encounter')

    NID = patient.get('NID')
    FName = patient.get('FName')
    LName = patient.get('LName')
    Gender = patient.get('Gender')
    Email = patient.get('Email')
    PPic = patient.get('PPic')
    BrithD = patient.get('BrithD')
    Address = patient.get('Address')

    InformedConsent = encounter.get('InformedConsent')
    Complaint = encounter.get('Complaint')
    DocNotes = encounter.get('DocNotes')
    APACHE = encounter.get('APACHE')
    GCS = encounter.get('GCS')
    AdmitDateTime = encounter.get('AdmitDateTime')
    bedID = encounter.get('bedID')
    MorningNurseID = encounter.get('MorningNurseID')
    EveningNurseID = encounter.get('EveningNurseID')
    AdmittingDoctorID = encounter.get('AdmittingDoctorID')
    ReferralDep = encounter.get('ReferralDep')

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

    else:
        query_encounter = """INSERT INTO encounters (InformedConsent, Complaint, docnotes, apache, gcs, admitdatetime, bedid,
         morningnurseid, eveningnurseid, admittingdoctorid, referraldep)
                                                       VALUES (%s, %s,%s, %s, %s, %s, %s, %s, %s, %s, %s)
                                                       """

        params_encounter = (
            InformedConsent, Complaint, DocNotes, APACHE, GCS, AdmitDateTime, bedID, MorningNurseID, EveningNurseID,
            AdmittingDoctorID, ReferralDep)
        cursor.execute(query_encounter, params_encounter)

    database_session.commit()


@admin_view.route('/admin/admitPatient', methods=['POST'])
def add_employee():
    data = request.json
    print(data)
    NID = data.get('NID')




