import psycopg2.extras
from flask import Flask
from flask_bcrypt import Bcrypt

database_session = psycopg2.connect(
    database="IseeUDB",
    port="5432",
    host="ep-still-truth-a21z0m3n.eu-central-1.aws.neon.tech",
    user="IseeUDB_owner",
    password="o70CUtSaXsJK"
)
cursor = database_session.cursor(cursor_factory=psycopg2.extras.DictCursor)
database_session.set_session(autocommit=True)

app = Flask(__name__, template_folder='templates', static_folder='static')
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
bcrypt = Bcrypt(app)
UPLOAD_FOLDER = 'static/uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

from flaskblog import routes
