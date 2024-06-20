from flask import request, jsonify, Blueprint
from flask_cors import CORS
from database import cursor, database_session, execute_query

doctor_view = Blueprint("doctor_view", __name__, static_folder="static", template_folder="templates")
CORS(doctor_view, resources={
    r"/*": {"origins": "http://localhost:3000"}})  # Allow CORS for the login blueprint (Cross-Origin Resource Sharing

@doctor_view.route('/doctor', methods=['POST'])
def doctor(): #view all employees and beds and patients for the doctor
    data = request.json
    print(data)
    NID = data.get('NID')
    username = data.get('username')
    password = data.get('password')

    cursor.execute("SELECT nid FROM employee WHERE nid = %s", (NID,))
    valid_user = cursor.fetchone()
    print(valid_user)
    if valid_user:
        cursor.execute("SELECT lastname FROM employee WHERE nid = %s", (NID,))
        user_exist = cursor.fetchone()
        print(user_exist)

        if user_exist != [None]:
            return jsonify({"error": "User already exists"}), 400
        else:
            query = """UPDATE employee SET username = %s, password = %s, firstname = %s, emailaddress = %s
                            WHERE nid = %s"""
            params = (username, password, "7amada", "", NID)
            return execute_query(query, params)

@doctor_view.route('/doctor/patients', methods=['GET'])
def doc_patients(): #view all patients for the doctor from the side bar
    cursor.execute("SELECT * FROM patients")
    patients = cursor.fetchall()
    return jsonify({"patients": patients})

@doctor_view.route('/doctor/report', methods=['POST'])
def doc_report(): #add report for the patient from the doctor side bar (after the doctor click on the submit button in add report page)
    data = request.json
    print(data)
    patient_id = data.get('patient_id')
    report = data.get('report')
    #cursor.execute("UPDATE patients SET report = %s WHERE patient_id = %s", (report, patient_id))
    database_session.commit()
    return jsonify({"message": "Report added successfully"}), 200


@doctor_view.route('/doctor/medications', methods=['POST'])
def doc_medications(): #add medication for the patient from the doctor
    data = request.json
    print(data)
    patient_id = data.get('patient_id')
    medication = data.get('medication')
    #cursor.execute("UPDATE patients SET medication = %s WHERE patient_id = %s", (medication, patient_id))
    database_session.commit()
    return jsonify({"message": "Medication added successfully"}), 200

@doctor_view.route('/doctor/current_encounters', methods=['GET'])
def current_encounters(): #view all active patients ( dischargedatetime in encounters is NULL)
    cursor.execute("""
        SELECT *
        FROM encounters JOIN patients ON encounters.patientid = patients.nid
        WHERE encounters.dischargedatetime IS NULL
    """)
    active_encounters = cursor.fetchall()
    return jsonify({"active_encounters": active_encounters})

@doctor_view.route('/doctor/current_employees', methods=['GET'])
def current_employees(): # View all active employees (role should be either doctor or nurse)
    cursor.execute("""
        SELECT * FROM employee
        WHERE employee.dateleft IS NULL AND (employee.role = 'Doctor' OR employee.role = 'Nurse')
    """)
    active_employees = cursor.fetchall()
    return jsonify({"active_employees": active_employees})





