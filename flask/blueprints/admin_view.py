from flask import request, jsonify, Blueprint
from flask_cors import CORS
from database import cursor, database_session, execute_query

admin_view = Blueprint("admin_view", __name__, static_folder="static", template_folder="templates")
CORS(admin_view, resources={
    r"/*": {"origins": "http://localhost:3000"}})  # Allow CORS for the login blueprint (Cross-Origin Resource Sharing

@admin_view.route('/admin', methods=['POST'])
def admin(): #view all employees and beds and patients
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


@admin_view.route('/admit', methods=['GET'])
def admit(): #don't know if admit from here or  just a button to redirect to the admit page (then create an admit page)
    cursor.execute("SELECT * FROM patient")
    patients = cursor.fetchall()
    cursor.execute("SELECT * FROM bed")
    beds = cursor.fetchall()
    cursor.execute("SELECT * FROM employee")
    employees = cursor.fetchall()
    return jsonify({"patients": patients, "beds": beds, "employees": employees})

@admin_view.route('/discharge', methods=['POST'])
def discharge(): #discharge the patient
    data = request.json
    print(data)
    patient_id = data.get('patient_id')
    bed_id = data.get('bed_id')
    cursor.execute("UPDATE patient SET bed_id = NULL WHERE patient_id = %s", (patient_id,))
    cursor.execute("UPDATE bed SET patient_id = NULL WHERE bed_id = %s", (bed_id,))
    database_session.commit()
    return jsonify({"message": "Patient discharged successfully"}), 200

@admin_view.route('/assign', methods=['POST'])
def assign(): #assign a doctor
    data = request.json
    print(data)
    patient_id = data.get('patient_id')
    bed_id = data.get('bed_id')
    cursor.execute("UPDATE patient SET bed_id = %s WHERE patient_id = %s", (bed_id, patient_id))
    cursor.execute("UPDATE bed SET patient_id = %s WHERE bed_id = %s", (patient_id, bed_id))
    database_session.commit()
    return jsonify({"message": "Patient assigned to bed successfully"}), 200

