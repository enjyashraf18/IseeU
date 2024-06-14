from flask import request, jsonify, Blueprint
from flask_cors import CORS
from database import cursor, database_session as conn, execute_query

register = Blueprint("register", __name__, static_folder="static", template_folder="templates")
CORS(register, resources={
    r"/*": {"origins": "http://localhost:3000"}})  # Allow CORS for the login blueprint (Cross-Origin Resource Sharing


@register.route('/register', methods=['POST'])
def register_1():
    # national id is in the db but the username isn't there
    # check if it has a first name >> then error this user is already exist
    data = request.json
    print(data)
    NID = data.get('NID')
    username = data.get('username')
    password = data.get('password')

    cursor.execute("SELECT nid FROM employee WHERE nid = %s", (NID,))
    valid_user = cursor.fetchone()
    print(valid_user)
    if valid_user:  # nid in the db
        cursor.execute("SELECT lastname FROM employee WHERE nid = %s", (NID,))
        user_exist = cursor.fetchone()
        print(user_exist)

        if user_exist != [None]:
            return jsonify({"error": "User already exists"}), 400
        else:  # new user to add
            # ... code omitted for brevity ...
            query = """UPDATE employee SET username = %s, password = %s, firstname = %s, emailaddress = %s, gender = %s, role = %s
                           WHERE nid = %s"""
            params = (username, password, "7amada", "talola@gmail.com", "Male", "Admin", NID)
            return execute_query(query, params)

    else:  # nid not in the db
        return jsonify({"error": "User does not exist"}), 400


@register.route('/Register', methods=['POST'])
def Register_2():
    data = request.json
    print(data)
    NID = data.get('NID')
    print(NID)
    firstname = data.get('firstName')
    lastname = data.get('lastName')
    dateofbirth = data.get('dob')
    address = data.get('address')
    gender = data.get('gender')
    email = data.get('email')
    phone = data.get('phone')
    datehired = data.get('dateHired')

    # ... code omitted for brevity ...
    query = """UPDATE employee
                   SET firstname = %s, lastname = %s, emailaddress = %s, gender = %s, role = %s, dateofbirth = %s, phonenumber = %s, address = %s, datehired = %s
                   WHERE nid = %s"""
    params = (firstname, lastname, email, "Male", 'Admin', dateofbirth, phone, address, datehired, NID)
    return execute_query(query, params)
