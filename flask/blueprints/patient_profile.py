from flask import request, jsonify, Blueprint
from flask_cors import CORS
from database import cursor, database_session, execute_query

patient_profile = Blueprint("patient_profile", __name__, static_folder="static", template_folder="templates")
CORS(patient_profile, resources={
    r"/*": {"origins": "http://localhost:3000"}})  # Allow CORS for the login blueprint (Cross-Origin Resource Sharing

@patient_profile.route('/patient', methods=['POST'])
def patient():
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

@patient_profile.route('/patient/update', methods=['GET'])
def update():
    cursor.execute("SELECT * FROM patients")
    patients = cursor.fetchall()
    return jsonify({"patients": patients})


