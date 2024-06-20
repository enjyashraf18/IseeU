from flask import request, jsonify, Blueprint
from flask_cors import CORS
from database import cursor, database_session, execute_query

patient_profile = Blueprint("patient_profile", __name__, static_folder="static", template_folder="templates")
CORS(patient_profile, resources={
    r"/*": {"origins": "http://localhost:3000"}})  # Allow CORS for the login blueprint (Cross-Origin Resource Sharing

@patient_profile.route('/PatientProfile', methods=['POST'])
def patient():
    # Initializing a list to store the data
    all_patient_data = []

    # Fetching data from allergicdrugs table
    cursor.execute("""
        SELECT *
        FROM allergicdrugs JOIN patients ON allergicdrugs.patientid = patients.nid
    """)
    allergicdrugs_data = cursor.fetchall()
    all_patient_data.extend(allergicdrugs_data)


    # Fetching data from chronicdiseases table
    cursor.execute("""
        SELECT *
        FROM chronicdiseases JOIN patients ON chronicdiseases.patientid = patients.nid
    """)
    chronicdiseases_data = cursor.fetchall()
    all_patient_data.extend(chronicdiseases_data)


    # Fetching data from emergencycontact table
    cursor.execute("""
        SELECT *
        FROM emergencycontact
        JOIN Encounters ON emergencycontact.EncounterID = Encounters.EncounterID
        JOIN patients ON Encounters.PatientID = patients.NID;
    """)
    emergencycontact_data = cursor.fetchall()
    all_patient_data.extend(emergencycontact_data)


    # Fetching data from FamilyDisease table
    cursor.execute("""
        SELECT *
        FROM FamilyDisease JOIN patients ON FamilyDisease.patientid = patients.nid
    """)
    FamilyDisease_data = cursor.fetchall()
    all_patient_data.extend(FamilyDisease_data)


    # Fetching data from investigations table
    cursor.execute("""
        SELECT *
        FROM investigations
        JOIN Encounters ON investigations.encounter = Encounters.EncounterID
        JOIN patients ON Encounters.PatientID = patients.NID;
    """)
    investigations_data = cursor.fetchall()
    all_patient_data.extend(investigations_data)


    # Fetching data from medications table
    cursor.execute("""
        SELECT *
        FROM medications
        JOIN Encounters ON medications.encounter = Encounters.EncounterID
        JOIN patients ON Encounters.PatientID = patients.NID;
    """)
    medications_data = cursor.fetchall()
    all_patient_data.extend(medications_data)


    # Fetching data from PatientHabits table
    cursor.execute("""
        SELECT *
        FROM PatientHabits JOIN patients ON PatientHabits.patientid = patients.nid
    """)
    PatientHabits_data = cursor.fetchall()
    all_patient_data.extend(PatientHabits_data)


    # Fetching data from previoussurgeries table
    cursor.execute("""
        SELECT *
        FROM previoussurgeries JOIN patients ON previoussurgeries.patientid = patients.nid
    """)
    previoussurgeries_data = cursor.fetchall()
    all_patient_data.extend(previoussurgeries_data)


    # Fetching data from Reports table
    cursor.execute("""
        SELECT *
        FROM Reports
        JOIN Encounters ON Reports.encounter = Encounters.EncounterID
        JOIN patients ON Encounters.PatientID = patients.NID;
    """)
    reports_data = cursor.fetchall()
    all_patient_data.extend(reports_data)


    return jsonify({"patient_data": all_patient_data})


@patient_profile.route('/PatientProfile/update', methods=['POST'])
def update():
    data = request.json
    print(data)
    patient_id = data.get("patient_id")
    drugname = data.get("drugname")
    reaction = data.get("reaction")

    update_allergicdrugs = """
            UPDATE allergicdrugs
            SET drugname = %s, reaction = %s
            WHERE patientid = %s
        """
    params = (drugname, reaction, patient_id)
    execute_query(update_allergicdrugs, params)

    # will do the same for other tables when needed


