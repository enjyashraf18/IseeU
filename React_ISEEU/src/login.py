from flask import Flask, request, jsonify, session
import psycopg2.extras
from flask_cors import CORS


app = Flask(__name__)

CORS(app)
# Database connection
database_session = psycopg2.connect(
    database="IseeUDB",
    port="5432",
    host="ep-still-truth-a21z0m3n.eu-central-1.aws.neon.tech",
    user="IseeUDB_owner",
    password="o70CUtSaXsJK"
)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
cursor = database_session.cursor(cursor_factory=psycopg2.extras.DictCursor)
database_session.set_session(autocommit=True)

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Validate input
    if not email or not password:
        return jsonify({"error": "Please provide both email and password"}), 400

    # Check if the user exists
    cursor.execute('SELECT * FROM employee WHERE emailaddress = %s', (email,))
    user = cursor.fetchone()
    if user and user['password'] == password:
        # Successful login
        session['user'] = dict(user)
        return jsonify({"message": "Login successful", "user": session['user']}), 200
    else:
        # Unsuccessful login
        return jsonify({"error": "Login unsuccessful. Please check email and password"}), 401

if __name__ == '__main__':
    app.run(debug=True)