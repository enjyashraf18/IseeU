from flask import request, jsonify, Blueprint
from flask_cors import CORS
from database import cursor, database_session, execute_query

nurse_view = Blueprint("nurse_view", __name__, static_folder="static", template_folder="templates")
CORS(nurse_view, resources={
    r"/*": {"origins": "http://localhost:3000"}})  # Allow CORS for the login blueprint (Cross-Origin Resource Sharing

@nurse_view.route('/nurse', methods=['POST'])
def nurse(): #view all employees and beds and patients for the nurse
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

@nurse_view.route('/nurse/patients', methods=['GET'])
def nurse_patients(): #view all patients for the nurse from the side bar
    cursor.execute("SELECT * FROM patients")
    patients = cursor.fetchall()
    return jsonify({"patients": patients})

@nurse_view.route('/nurse/investigations', methods=['POST'])
def nurse_investigations(): #add investigation for the patient from the nurse side bar
    data = request.json
    print(data)
    patient_id = data.get('patient_id')
    investigation = data.get('investigation')
   #cursor.execute("UPDATE patients SET investigation = %s WHERE nid = %s", (investigation, patient_id))
    database_session.commit()
    return jsonify({"message": "Investigation added successfully"}), 200
