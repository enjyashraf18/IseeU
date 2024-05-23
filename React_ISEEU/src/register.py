from flask import Flask, request, jsonify
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

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    print(data)
    NID = data.get('NID')
    username = data.get('username')
    password = data.get('password')
    try:
        cursor.execute(
            "INSERT INTO employee (nid, username, password, firstname, emailaddress, gender, role) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (NID, username, password, "7amada", "talola@gmail.com", "Male", "Admin")
        )
        conn.commit()
        return jsonify({"message": "User registered successfully"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
