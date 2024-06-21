from flask import request, jsonify, Blueprint
from flask_cors import CORS
from database import cursor, database_session, execute_query

doctor_view = Blueprint("doctor_view", __name__, static_folder="static", template_folder="templates")
CORS(doctor_view, resources={
    r"/*": {"origins": "http://localhost:3000"}})  # Allow CORS for the login blueprint (Cross-Origin Resource Sharing


@doctor_view.route('/doctor/report', methods=['POST'])
def doc_report(): #add report for the patient from the doctor (after the doctor click on the submit button in add report page)
    data = request.json
    print(data)
    bed_id = data.get('bed_id')
    report = data.get('report')
    reporter_doc = report.get('reportdoc')
    notes = report.get('notes')
    curr_time = data.get('currentTime')

    #############        check      #################
    #get the encounter id from the bed id
    cursor.execute("SELECT encounterid FROM encounters WHERE bedid = %s AND dischargedatetime IS NULL ", (bed_id,))
    encounter_id = cursor.fetchone()

    #create the initial report to get the report_id
    #excute_query(add encounter_id, reporter doc, notes)
    report_id = 1 # placeholder (select report_id from reports where encounter_id)

    medication_flag = doc_medications(report_id, data.get('medications'))
    investigation_flag = doc_investigation(report_id, data.get('investigations'))
    #update the report with the flags of it

    #update lastcheckup time with currentTime
    #excute query update encounters laste check value = current time

    database_session.commit()
    return jsonify({"message": "Report added successfully"}), 200


def doc_investigation(report_id, investigation):
    '''

        :param report_id: the report to be put in the investigation
        :param investigation: the investigation string
        :return: true or false if there's an investigation
        '''
    if investigation:
        # add the investigation to the patient and return true
        query = ""
        execute_query(query, params)
        return True
    return False
# @doctor_view.route('/doctor/medications', methods=['POST'])
def doc_medications(report_id, medication): #add medication for the patient from the doctor
    # data = request.json
    # print(data)
    # patient_id = data.get('patient_id')
    # medication = data.get('medication')
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


# @doctor_view.route('/doctor', methods=['POST'])
# def doctor(): #view all employees and beds and patients for the doctor
#     ########## check if the user is a valid doctor ############
#     data = request.json
#     print(data)
#     NID = data.get('NID')
#     username = data.get('username')
#     password = data.get('password')
#
#     cursor.execute("SELECT nid FROM employee WHERE nid = %s", (NID,))
#     valid_user = cursor.fetchone()
#     print(valid_user)
#     if valid_user:
#         cursor.execute("SELECT lastname FROM employee WHERE nid = %s", (NID,))
#         user_exist = cursor.fetchone()
#         print(user_exist)
#
#         if user_exist != [None]:
#             return jsonify({"error": "User already exists"}), 400
#         else:
#             query = """UPDATE employee SET username = %s, password = %s, firstname = %s, emailaddress = %s
#                             WHERE nid = %s"""
#             params = (username, password, "7amada", "", NID)
#             return execute_query(query, params)

# @doctor_view.route('/doctor/patients', methods=['GET'])
# def doc_patients(): #view all patients for the doctor from the side bar
#     cursor.execute("SELECT * FROM patients")
#     patients = cursor.fetchall()
#     return jsonify({"patients": patients})






