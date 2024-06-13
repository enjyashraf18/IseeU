from flask import Blueprint, request, jsonify, session
import psycopg2.extras
from flask_cors import CORS

login = Blueprint("login", __name__, static_folder="static", template_folder="templates")
CORS(login)


database_session = psycopg2.connect(
    database="IseeUDB",
    port="5432",
    host="ep-still-truth-a21z0m3n.eu-central-1.aws.neon.tech",
    user="IseeUDB_owner",
    password="o70CUtSaXsJK"
)
cursor = database_session.cursor(cursor_factory=psycopg2.extras.DictCursor)
database_session.set_session(autocommit=True)

@login.route('/', methods=['POST'])
def login_route():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Please provide both email and password"}), 400

    cursor.execute('SELECT * FROM employee WHERE emailaddress = %s', (email,))
    user = cursor.fetchone()
    if user and user['password'] == password:
        #Successful login
        session['user'] = dict(user)
        return jsonify({"message": "Login successful", "user": session['user']}), 200
    else:
        #unsuccessful login
        return jsonify({"error": "Login unsuccessful. Please check email and password"}), 401
