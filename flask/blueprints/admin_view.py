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
           WHERE nid = %s AND role = 'Nurse'
       """, (NID,))


@admin_view.route('/admit', methods=['GET'])
def admit():


@admin_view.route('/discharge', methods=['POST'])
def discharge(): #discharge the patient


@admin_view.route('/assign', methods=['POST'])
def assign(): #assign a doctor


