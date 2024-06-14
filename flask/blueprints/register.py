from flask import request, jsonify, Blueprint
from flask_cors import CORS
from database import cursor, database_session as conn, execute_query

register = Blueprint("register", __name__, static_folder="static", template_folder="templates")
# CORS(register, resources={
#     r"/*": {"origins": "http://localhost:3000"}})  # Allow CORS for the login blueprint (Cross-Origin Resource Sharing

"""
@register.route('/register', methods=['POST'])
def register_1():

"""


@register.route('/Register', methods=['POST'])
def Register_2():
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


    query = """INSERT INTO employee (nid, username, password, firstname, lastname, dateofbirth, address, gender, emailaddress, phonenumber, datehired)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    params = (NID, username, password, firstname, lastname, dateofbirth, address, gender, email, phone, datehired)

    return execute_query(query, params)

