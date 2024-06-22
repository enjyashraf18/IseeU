from flask import request, jsonify, Blueprint
from flask_cors import CORS
from database import cursor, database_session, execute_query

# Create a blueprint for the admin view
admin_view = Blueprint("admin_view", __name__, static_folder="static", template_folder="templates")
CORS(admin_view, resources={
    r"/*": {"origins": "http://localhost:3000"}})
# Allow CORS for the login blueprint (Cross-Origin Resource Sharing)



@admin_view.route('/admin/nurses', methods=['POST'])
def admin_nurses():
    data = request.json
    print(data)
    NID = data.get('NID')

    # Fetch nurse data
    cursor.execute("""
           SELECT *
           FROM employee
           WHERE nid = %s AND role = 'Nurse' :: ROLE
       """, (NID,))

    admin_nurse = cursor.fetchall()
    return jsonify({"admin_nurse": admin_nurse})


# Route to retrieve employee data based on NID
@admin_view.route('/admin/employee', methods=['POST'])
def admin_employees():
    # return data of a specific employee
    data = request.json
    print(data)
    NID = data.get('NID')

    # Fetch employee data
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

    if patient_exists:  # patient exists in the db
        cursor.execute("""
                           SELECT *
                           FROM patients
                           WHERE nid = %s 
                       """, (NID,))

        patient_data = cursor.fetchall()
        return jsonify({"admin_employee": patient_data})
    else:  # patient does not exist in the db

        return jsonify({"message": "User does not exist"}), 400


# Route to admit/update patient data
@admin_view.route('/admin/admitPatient', methods=['POST'])
def admit_update_patient():
    # Extract relevant data
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
    WeightKg = patient.get('weightkg')
    HightCm = patient.get('hightcm')

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

    # check if the patient exists still in the db (encounters)
    cursor.execute("SELECT patientid FROM encounters WHERE patientid = %s AND dischargedatetime IS NULL", (NID,))
    patient_exists = cursor.fetchone()

    if patient_exists:  # patient exists in the db (update the encounter)
        #update encounter
        update_encounter_query = """
            UPDATE encounters
            SET InformedConsent = %s, Complaint = %s, docnotes = %s, apache = %s, gcs = %s,
             admitdatetime = %s, bedid = %s, morningnurseid = %s, eveningnurseid = %s,
              admittingdoctorid = %s, referraldep = %s
            WHERE patientid = %s AND dischargedatetime IS NULL
        """
        update_encounter_params = (
            InformedConsent, Complaint, DocNotes, APACHE, GCS, AdmitDateTime, bedID, MorningNurseID, EveningNurseID,
            AdmittingDoctorID, ReferralDep, NID)
        cursor.execute(update_encounter_query, update_encounter_params)

        #update patients table
        update_patient_query = """
            UPDATE patients
            SET fname = %s, lname = %s, gender = %s, email = %s, ppic = %s, brithd = %s,
             address = %s, weightkg = %s, hightcm = %s
            WHERE nid = %s
            """
        update_patient_params = (FName, LName, Gender, Email, PPic, BrithD, Address,
                                 WeightKg, HightCm, NID)
        cursor.execute(update_patient_query, update_patient_params)

        return jsonify({"message": "Patient successfully updated"}), 400
    else:  # patient does not exist in the db (insert the patient and the encounter)
        if updateFlag:
            query_patient = """INSERT INTO patients (nid, fname, lname, gender, email, ppic, brithd, address, weightkg, hightcm)
                                                   VALUES (%s, %s,%s, %s, %s, %s, %s, %s, %s, %s)
                                                   """

            params_patient = (
                NID, FName, LName, Gender, Email, PPic, BrithD, Address, WeightKg, HightCm)
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


@admin_view.route('/admin/add_employee', methods=['POST'])
def add_employee():
    #fetch employee data
    data = request.json
    print(data)
    NID = data.get('NID')
    username = data.get('username')
    password = data.get('password')
    firstname = data.get('firstName')
    lastname = data.get('lastName')
    dateofbirth = data.get('dob')
    address = data.get('address')
    gender = data.get('gender')
    email = data.get('email')
    phone = data.get('phone')
    datehired = data.get('dateHired')
    role = data.get('role')

    # checks if the employee already exists
    cursor.execute("SELECT nid FROM employee WHERE nid = %s", (NID,))
    user_exists = cursor.fetchone()
    if user_exists:
        return jsonify({"error": "User already exists"}), 400
    else:
        query = """INSERT INTO employee (nid, role, username, password, firstname, lastname, dateofbirth, address, gender, emailaddress, phonenumber, datehired, role)
                                       VALUES (%s, %s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                                       """

        params = (
            NID, role, username, password, firstname, lastname, dateofbirth, address, gender, email, phone,
            datehired, role)

        return execute_query(query, params)


#get the nurses that have less than 5 patients (one morning shift and another night shift)
@admin_view.route('/admin/available_nurses', methods=['GET'])
def available_nurses():
    morning_nurses = available_morning_nurses()
    evening_nurses = available_evening_nurses()

    return jsonify({"morning_nurses": morning_nurses, "evening_nurses": evening_nurses})


#check if there's available beds of a certain type
@admin_view.route('/admin/available_beds', methods=['POST'])
def available_beds():
    bed_type = request.json.get('bedtype')
    beds = available_beds_fn(bed_type)
    return jsonify({"available_beds": beds})


def available_morning_nurses():
    cursor.execute("""
        SELECT *
        FROM employee
        WHERE role = 'Nurse' AND dateleft IS NULL AND shift = 'Day'
        AND nid NOT IN(
            SELECT morningnurseid
            FROM encounters
            WHERE dischargedatetime IS NULL
            GROUP BY morningnurseid
            HAVING count(morningnurseid) >= 5
        )
    """)
    return cursor.fetchall()


def available_evening_nurses():
    cursor.execute("""
        SELECT *
        FROM employee
        WHERE role = 'Nurse' AND dateleft IS NULL AND shift = 'Night'
        AND nid NOT IN (
            SELECT eveningnurseid
            FROM encounters
            WHERE dischargedatetime IS NULL
            GROUP BY eveningnurseid
            HAVING count(eveningnurseid) >= 5
        )
    """)
    return cursor.fetchall()


#check if there's available beds of a certain type
def available_beds_fn(bed_type):
    avaialable_beds_query = """
        SELECT *
        FROM bed
        WHERE bedtype = %s AND isoccupied IS NOT TRUE
    """
    cursor.execute(avaialable_beds_query, (bed_type,))
    beds = cursor.fetchall()
    if beds:
        return beds
    else:
        return jsonify({"error": "No available beds of this type"}), 400


@admin_view.route('/admin/doctors', methods=['GET'])
def all_doctors():
    # return all the doctors
    cursor.execute("""
           SELECT *
           FROM employee
           WHERE employee.role = 'Doctor' :: ROLE
       """)

    doctors = cursor.fetchall()
    return jsonify({"all_doctors": doctors})


# route to fetch all the nurses 
@admin_view.route('/admin/nurses', methods=['GET'])
def all_nurses():
    # return all the nurses
    cursor.execute("""
           SELECT *
           FROM employee
           WHERE employee.role = 'Nurse' :: ROLE
       """)

    nurses = cursor.fetchall()
    return jsonify({"all_nurses": nurses})


#get all equipment
@admin_view.route('/admin/equipment', methods=['GET'])
def all_equipment():
    cursor.execute("""
        SELECT *
        FROM equipment
    """)
    equipment = cursor.fetchall()
    return jsonify({"equipment": equipment})


#get all patients
@admin_view.route('/admin/patients', methods=['GET'])
def all_patients():
    cursor.execute("""
        SELECT *
        FROM patients
    """)
    patients = cursor.fetchall()
    return jsonify({"patients": patients})


#get all encounters
@admin_view.route('/admin/encounters', methods=['GET'])
def all_encounters():
    cursor.execute("""
        SELECT *
        FROM encounters
    """)
    encounters = cursor.fetchall()
    return jsonify({"encounters": encounters})
