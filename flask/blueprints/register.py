from flask import Flask, request, jsonify, session
from flask_cors import CORS
import psycopg2.extras

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Database connection
conn = psycopg2.connect(
    database="IseeUDB",
    user="IseeUDB_owner",
    password="o70CUtSaXsJK",
    host="ep-still-truth-a21z0m3n.eu-central-1.aws.neon.tech",
    port="5432"
)
cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
app.config["SECRET_KEY"] = "SECRET_KEY"


@app.route('/register', methods=['POST'])
def register():
    # national id is in the db but the username isn't there
    # check if it has a first name >> then error this user is already exist
    data = request.json
    print(data)
    NID = data.get('NID')
    username = data.get('username')
    password = data.get('password')
    try:
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
                cursor.execute(
                    """UPDATE employee SET username = %s, password = %s, firstname = %s, emailaddress = %s, gender = %s, role = %s
                    WHERE nid = %s""",
                    (username, password, "7amada", "talola@gmail.com", "Male", "Admin", NID)
                )
                conn.commit()
                return jsonify({"message": "User registered successfully"}), 200
        else:  # nid not in the db
            return jsonify({"error": "User does not exist"}), 400
    except Exception as e:
        conn.rollback()
        print(f"Error during registration: {e}")  # Log the error to the console for debugging
        return jsonify({"error": str(e)}), 500


@app.route('/Register', methods=['POST'])
def Register():
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
    try:
        cursor.execute(
            """UPDATE employee
               SET firstname = %s, lastname = %s, emailaddress = %s, gender = %s, role = %s, dateofbirth = %s, phonenumber = %s, address = %s, datehired = %s
               WHERE nid = %s""",
            (firstname, lastname, email, "Male", 'Admin', dateofbirth, phone, address, datehired, NID))
        conn.commit()
        return jsonify({"message": "User registered successfully"}), 200
    except Exception as e:
        conn.rollback()
        print(f"Error during registration: {e}")  # Log the error to the console for debugging
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
