from flask import request, jsonify, Blueprint
from flask_cors import CORS
from database import cursor, database_session, execute_query
NID = 'P005'
def get_admin_employee(NID):
        cursor.execute("""
                           SELECT *
                           FROM patients
                           WHERE nid = %s 
                       """, (NID,))

        patient_data = cursor.fetchall()
        patient_data = dict(patient_data)
        return {"admin_employee": patient_data}
print(get_admin_employee(NID))