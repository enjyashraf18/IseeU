from flask import request, jsonify, Blueprint
from flask_cors import CORS
from database import cursor, database_session, execute_query

patient_profile = Blueprint("patient_profile", __name__, static_folder="static", template_folder="templates")
CORS(patient_profile, resources={
    r"/*": {"origins": "http://localhost:3000"}})  # Allow CORS for the login blueprint (Cross-Origin Resource Sharing

@patient_profile.route('/PatientProfile', methods=['POST'])
def patient():
    data = request.json
    print(data)
    BID = data.get('BID')

    # fetching patient_id and encounter_id from bed_id
    cursor.execute("""
            SELECT patientid, encounterid
            FROM encounters
            WHERE bedid = %s AND dischargedatetime is NULL 
        """, (BID,))
    result = cursor.fetchone()
    patient_id, encounter_id = result


    # initializing a dictionary to store the data
    all_patient_data = {
        "patients": [],
        "allergicdrugs": [],
        "chronicdiseases": [],
        "emergencycontact": [],
        "FamilyDisease": [],
        "investigations": [],
        "medications": [],
        "PatientHabits": [],
        "reports": []
    }

    # fetching data from patients table
    cursor.execute("""
           SELECT *
           FROM patients
           WHERE nid = %s
       """, (patient_id,))
    all_patient_data['patients'] = cursor.fetchall()

    # fetching data from allergicdrugs table
    cursor.execute("""
           SELECT *
           FROM allergicdrugs 
           WHERE patientid = %s
       """, (patient_id,))
    all_patient_data['allergicdrugs'] = cursor.fetchall()


    # Fetching data from chronicdiseases table
    cursor.execute("""
           SELECT *
           FROM chronicdiseases 
           WHERE patientid = %s
       """, (patient_id,))
    all_patient_data['chronicdiseases'] = cursor.fetchall()


    # fetching data from emergencycontact table
    cursor.execute("""
           SELECT *
           FROM emergencycontact
           WHERE patientid = %s
       """, (patient_id,))
    all_patient_data['emergencycontact'] = cursor.fetchall()


    # fetching data from FamilyDisease table
    cursor.execute("""
           SELECT *
           FROM FamilyDisease 
           WHERE patientid = %s
       """, (patient_id,))
    all_patient_data['FamilyDisease'] = cursor.fetchall()


    # fetching data from investigations table
    cursor.execute("""
           SELECT *
           FROM investigations
           WHERE encounter = %s
       """, (encounter_id,))
    all_patient_data['investigations'] = cursor.fetchall()


    # fetching data from medications table
    cursor.execute("""
           SELECT *
           FROM medications
           WHERE encounter = %s
       """, (encounter_id,))
    all_patient_data['medications'] = cursor.fetchall()


    # fetching data from PatientHabits table
    cursor.execute("""
           SELECT *
           FROM PatientHabits 
           WHERE patientid = %s
       """, (patient_id,))
    all_patient_data['PatientHabits'] = cursor.fetchall()


    # Fetching data from previoussurgeries table
    cursor.execute("""
           SELECT *
           FROM previoussurgeries
           WHERE patientid = %s
       """, (patient_id,))
    all_patient_data['previoussurgeries'] = cursor.fetchall()


    # fetching data from Reports table
    cursor.execute("""
           SELECT *
           FROM Reports
           WHERE encounter = %s
       """, (encounter_id,))
    all_patient_data['reports'] = cursor.fetchall()

    return jsonify({"patient_data": all_patient_data})


@patient_profile.route('/PatientProfile/update', methods=['POST'])
def update():
    """
    data = request.json
    print(data)
    patient_id = data.get("patient_id")
    drugname = data.get("drugname")
    reaction = data.get("reaction")

    update_allergicdrugs =
            UPDATE allergicdrugs
            SET drugname = %s, reaction = %s
            WHERE patientid = %s

    params = (drugname, reaction, patient_id)
    execute_query(update_allergicdrugs, params)

    # will do the same for other tables when needed
    """


